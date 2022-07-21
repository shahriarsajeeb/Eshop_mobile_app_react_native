import {
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {logOutUser} from '../../../Redux/Actions/UserAction';

const {width} = Dimensions.get('window');
const height = Dimensions.get('window').height;

export default function Profile({navigation}) {
  const {user, error, loading} = useSelector(state => state.user);

  const dispatch = useDispatch();
  
  // Log out Handler
  const logOut = () => {
    dispatch(logOutUser());
    if (error) {
      ToastAndroid.showWithGravity(
        `Log out Failed`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
    ToastAndroid.showWithGravity(
      `Log out Success`,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  }   


  return (
    <View>
      <View style={styles.profileMain}>
        <View
          style={{
            position: 'relative',
          }}>
          <Image
            source={{uri: user.avatar.url}}
            style={{
              width: width * 1,
              height: height * 0.35,
            }}
          />
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 10,
              // backgroundColor: 'red',
            }}>
            <Icon name="create-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.profileDetails}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text
              style={{
                marginHorizontal: 15,
                paddingTop: 10,
                fontSize: 18,
                color: '#000',
              }}>
              Join On: {String(user.createdAt).substr(0, 10)}
            </Text>
          </View>
          <View style={styles.profileOptions}>
            <TouchableOpacity
              style={{
                marginHorizontal: 15,
                marginVertical: 10,
              }}
              onPress={() => navigation.navigate('My Orders')}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Icon name="reader-outline" size={40} color="#333" />
                <Text style={styles.normalText}>My Orders</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginHorizontal: 15,
                marginVertical: 10,
              }}
              onPress={() =>
                navigation.navigate('UpdateProfile', {isProfile: false})
              }>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Icon name="open-outline" size={40} color="#333" />
                <Text style={styles.normalText}>Change Password</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginHorizontal: 15,
                marginVertical: 10,
              }}
              onPress={() =>
                navigation.navigate('UpdateProfile', {isProfile: true})
              }>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Icon name="settings-outline" size={40} color="#333" />
                <Text style={{color: '#000', fontSize: 18}}>Edit Profile</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginHorizontal: 15,
                marginVertical: 10,
              }}
              onPress={() =>
                Linking.openURL('https://programmershahriarsajeeb.com/')
              }>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Icon name="earth-outline" size={40} color="#333" />
                <Text style={styles.normalText}>Developer Contact</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginHorizontal: 15,
                marginVertical: 10,
              }}
              onPress={logOut}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <Icon name="log-out-outline" size={40} color="#333" />
                <Text style={styles.normalText}>Log Out</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  profileMain: {
    width: width * 1,
    height: height * 1,
    backgroundColor: '#fff',
  },
  profileDetails: {
    width: width * 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: '#fff',
    marginTop: -25,
  },
  userName: {
    color: '#333',
    fontSize: 25,
    marginTop: 10,
    paddingHorizontal: width / 8 - 50,
    fontWeight: '600',
    paddingLeft: 5,
  },
  profileOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: width * 1,
    paddingVertical: 30,
    paddingHorizontal: 15,
  },
  normalText: {
    fontSize: 18,
    color: '#333',
  },
});
