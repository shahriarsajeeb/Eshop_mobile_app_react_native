import React, {useEffect, useState} from 'react';
import {Provider, useSelector} from 'react-redux';
import Store from './Redux/Store';
import {NavigationContainer} from '@react-navigation/native';
import Main from './Navigations/Main';
import Auth from './Navigations/Auth';
import {loadUser} from './Redux/Actions/UserAction';
import Splash from './src/components/Layout/Splash';
import {Dimensions, LogBox, Text, View} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import LottieView from 'lottie-react-native';

LogBox.ignoreAllLogs();

const height = Dimensions.get('window').height;
const {width} = Dimensions.get('window');

const App = () => {
  return (
    <Provider store={Store}>
      <AppStack />
    </Provider>
  );
};

const AppStack = () => {
  const {isAuthenticated, loading} = useSelector(state => state.user);
  const [netInfo, setNetInfo] = useState('');
  const [notConnected, setNotConnected] = useState(false);

  useEffect(() => {
    Store.dispatch(loadUser());

    // Network connection check
    const data = NetInfo.addEventListener(state => {
      setNetInfo(
        `connectionType:${state.type} IsConnected?: ${state.isConnected}`,
      );
      if (state.isConnected === true) {
        setNotConnected(false);
      } else {
        setNotConnected(true);
      }
    });

    return data;
  }, []);

  return (
    <>
      {!notConnected ? (
        <>
          <NavigationContainer>
            <>
              {loading ? (
                <Splash />
              ) : (
                <>{isAuthenticated ? <Main /> : <Auth />}</>
              )}
            </>
          </NavigationContainer>
        </>
      ) : (
        <NetworkError />
      )}
    </>
  );
};

export default App;

const NetworkError = () => {
  return (
    <View
      style={{
        height: height * 1,
        width: width * 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LottieView
        source={require('./src/Assets/12955-no-internet-connection-empty-state.json')}
        speed={0.5}
        autoPlay
        loop={true}
        style={{
          width: width * 1,
          height: height / 2.5,
        }}
      />
      <Text
        style={{
          color: 'crimson',
          fontSize: 16,
          fontWeight: '600',
        }}>
        Please check your internet connection 😣
      </Text>
    </View>
  );
};
