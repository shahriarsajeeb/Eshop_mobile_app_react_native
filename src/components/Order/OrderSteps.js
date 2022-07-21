import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

export default function OrderSteps({activeTab}) {
  return (
    <View style={styles.OrderStepsMain}>
      <View style={styles.OrderSteps}>
        <Icon
          name="navigate-circle-outline"
          size={30}
          color={activeTab === 1 ? '#3BB77E' : '#000'}
        />
        <Text style={{color: '#000', fontSize: 15}}>Shipping Details</Text>
      </View>
      <View style={styles.OrderSteps}>
        <Icon
          name="checkmark-circle-outline"
          size={30}
          color={activeTab === 2 ? '#3BB77E' : '#000'}
        />
        <Text style={{color: '#000', fontSize: 15}}>Confirm Order</Text>
      </View>
      <View style={styles.OrderSteps}>
        <Icon
          name="wallet-outline"
          size={30}
          color={activeTab === 3 ? '#3BB77E' : '#000'}
        />
        <Text style={{color: '#000', fontSize: 15}}>Payment</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  OrderStepsMain: {
    width: width * 1,
    height: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  OrderSteps: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
