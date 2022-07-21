import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Layout/Header'
import Cart from "../components/Cart/Cart";

export default function CartScreen({navigation}) {
  return (
    <View>
      <Header navigation={navigation} />
      <Cart navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({})