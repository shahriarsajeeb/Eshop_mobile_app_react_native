import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Layout/Header'
import WishList from "../components/WishList/WishList";

export default function WishListScreen({navigation}) {
  return (
    <View>
      <Header navigation={navigation} />
      <WishList navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({})