import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../components/Layout/Header';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getOrder} from '../../Redux/Actions/OrderAction';

var {width} = Dimensions.get('window');

export default function OrderScreen({navigation}) {
  const {error, orders} = useSelector(state => state.orderData);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      ToastAndroid.showWithGravity(
        error,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
    dispatch(getOrder());
  }, [dispatch, error]);

  return (
    <View>
      <Header navigation={navigation} />
      <MyOrder orders={orders} />
    </View>
  );
}

const MyOrder = ({orders}) => {
  return (
    <View>
      {orders && orders.length > 0 ? (
        orders.map((item, index) => (
          <>
            <View
              key={index}
              style={{
                width: width * 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 10,
                marginVertical: 10,
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: '#333'}}>Order Status</Text>
                <Text
                  style={{
                    color:
                      item.orderStatus === 'Processing' ? 'crimson' : '#3BB77E',
                  }}>
                  {item.orderStatus}
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: '#333'}}>Items Qty</Text>
                <Text style={{color: '#333'}}>
                  {item.orderItems.reduce(
                    (total, item) => total + item.quantity,
                    0,
                  )}
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: '#333'}}>Amount</Text>
                <Text style={{color: '#333'}}>${item.totalPrice}</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: '#333'}}>Order Items</Text>
                <Text style={{color: '#333'}}>
                  {item.orderItems[0].productName}...
                </Text>
              </View>
            </View>
            <View
              style={{
                width: width * 1,
                height: 1,
                backgroundColor: '#00000036',
              }}
            />
          </>
        ))
      ) : (
        <View>
          <Text>Your OrderList is empty!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
