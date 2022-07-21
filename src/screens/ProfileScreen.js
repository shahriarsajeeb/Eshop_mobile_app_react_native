import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../components/Layout/Header';
import Profile from '../components/Profile/Profile';

export default function ProfileScreen({navigation}) {
  return (
    <View>
      <Header navigation={navigation} />
      <ScrollView showsHorizontalScrollIndicator={false}>
        <Profile navigation={navigation} />
      </ScrollView>
    </View>
  );
}
