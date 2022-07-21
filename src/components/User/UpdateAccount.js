import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import axios from 'axios';
import {URI} from '../../../Redux/URI';
import {useDispatch, useSelector} from 'react-redux';
import * as ImagePicker from 'react-native-image-picker';
import {loadUser, updateProfile} from '../../../Redux/Actions/UserAction';
import {useEffect} from 'react';

var {width} = Dimensions.get('window');
var height = Dimensions.get('window').height;

export default function UpdateAccount({navigation, route}) {
  const {user} = useSelector(state => state.user);
  const {isUpdated} = useSelector(state => state.updateUser);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState();

  const passwordChangeHandler = () => {
    if (oldPassword === '' || newPassword === '') {
      ToastAndroid.showWithGravity(
        'Please fill all the fields',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } else {
      if (oldPassword === newPassword) {
        ToastAndroid.showWithGravity(
          'Old and New Password cannot be same',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      } else {
        if (newPassword === confirmPassword) {
          const config = {headers: {'Content-Type': 'application/json'}};
          axios
            .put(
              `${URI}/api/v2/me/update`,
              {
                oldPassword,
                newPassword,
                confirmPassword,
              },
              config,
            )
            .then(res => {
              ToastAndroid.showWithGravity(
                `Password changed successfully`,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
              );
            })
            .catch(err => {
              ToastAndroid.showWithGravity(
                `${err.response.data.message}`,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
              );
            });
        } else {
          ToastAndroid.showWithGravity(
            'Password does not match',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
          );
        }
      }
    }
  };

  const updateImage = () => {
    ImagePicker.launchImageLibrary({
      width: 150,
      height: 150,
      cropping: true,
      compressImageQuality: 0.8,
      includeBase64: true
    }).then(image => {
      setAvatar(image.assets[0].base64);
    });
  };

  const dispatch = useDispatch(); 

  //  console.log(imageUrl);

  const updateProfileHandler = () => {
    let formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('avatar', avatar);
    // console.log(formData);
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatar(user.avatar.url);
    }
    if (isUpdated) {
      ToastAndroid.showWithGravity(
        `Profile updated successfully`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      ),
        navigation.navigate('Profile');
    }
  }, [dispatch, isUpdated, user]);

  return (
    <View>
      <View style={styles.updateProfileTop}>
        <TouchableOpacity onPress={() => navigation.navigate('profile')}>
          <Icon name="arrow-back" color="#333" size={30} />
        </TouchableOpacity>
      </View>
      {route.params?.isProfile !== true ? (
        <UpdatePassword
          oldPassword={oldPassword}
          setOldPassword={setOldPassword}
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          passwordChangeHandler={passwordChangeHandler}
        />
      ) : (
        <UpdateProfile
          user={user}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          updateProfileHandler={updateProfileHandler}
          updateImage={updateImage}
        />
      )}
    </View>
  );
}

const UpdatePassword = ({
  oldPassword,
  setOldPassword,
  newPassword,
  setNewPassword,
  showPassword,
  setShowPassword,
  passwordChangeHandler,
  confirmPassword,
  setConfirmPassword,
}) => {
  return (
    <View
      style={{
        height: height * 1,
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontSize: 25,
          color: '#333',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: 20,
        }}>
        Change Your Password
      </Text>
      <View style={styles.inputMain}>
        <TextInput
          placeholder="Enter your Old Password..."
          style={styles.input}
          placeholderTextColor={'#333'}
          textContentType="addressLine1"
          value={oldPassword}
          onChangeText={text => setOldPassword(text)}
          secureTextEntry={showPassword ? false : true}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}
          onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={!showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={25}
            color="#333"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputMain}>
        <TextInput
          placeholder="Enter your new Password..."
          style={styles.input}
          placeholderTextColor={'#333'}
          textContentType="addressLine1"
          value={newPassword}
          onChangeText={text => setNewPassword(text)}
          secureTextEntry={showPassword ? false : true}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}
          onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={!showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={25}
            color="#333"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputMain}>
        <TextInput
          placeholder="Enter your Confirm Password..."
          style={styles.input}
          placeholderTextColor={'#333'}
          textContentType="addressLine1"
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          secureTextEntry={showPassword ? false : true}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
          }}
          onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={!showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={25}
            color="#333"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={passwordChangeHandler}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const UpdateProfile = ({
  user,
  name,
  email,
  setName,
  setEmail,
  updateProfileHandler,
  updateImage,
}) => {
  return (
    <ScrollView
      style={{
        height: height * 1,
        paddingVertical: 20,
      }}>
      <Text
        style={{
          fontSize: 25,
          color: '#333',
          fontWeight: '700',
          textAlign: 'center',
          marginBottom: 20,
        }}>
        Update Your Profile
      </Text>
      <View
        style={[
          styles.inputMain,
          {
            alignItems: 'center',
          },
        ]}>
        <View
          style={{
            position: 'relative',
          }}>
          <TouchableOpacity onPress={updateImage}>
            <Image
              source={{
                uri: user?.avatar.url,
              }}
              style={{width: 150, height: 150, borderRadius: 75}}
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 5,
                right: 5,
                zIndex: 10,
              }}>
              <Icon name="create-outline" size={30} color="#3BB77E" />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputMain}>
        <TextInput
          placeholder={`${user.name}`}
          style={styles.input}
          placeholderTextColor={'#333'}
          textContentType="name"
          value={name}
          onChangeText={text => setName(text)}
        />
      </View>
      <View style={styles.inputMain}>
        <TextInput
          placeholder={`${user.email}`}
          style={styles.input}
          placeholderTextColor={'#333'}
          textContentType="emailAddress"
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={updateProfileHandler}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  updateProfileTop: {
    width: width * 1,
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  inputMain: {
    width: width * 0.8,
    marginLeft: width * 0.1,
    marginVertical: 15,
    color: '#333',
    position: 'relative',
  },
  input: {
    borderColor: '#00000036',
    borderWidth: 1,
    height: 50,
    color: '#333',
    borderRadius: 5,
    paddingLeft: 10,
  },
  button: {
    width: width * 0.8,
    marginLeft: width * 0.1,
    marginVertical: 20,
    backgroundColor: '#3BB77E',
    borderRadius: 5,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
