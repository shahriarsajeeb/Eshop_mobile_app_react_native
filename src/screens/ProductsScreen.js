import {StyleSheet, Text, ScrollView} from 'react-native';
import React from 'react';
import Header from '../components/Layout/Header';
import FilterProducts from "../components/Products/FilterProducts";

export default function ProductsScreen({navigation}) {

  return (
      <ScrollView>
        <Header navigation={navigation} />
        <FilterProducts navigation={navigation} />
      </ScrollView>
  );
}

const styles = StyleSheet.create({});
