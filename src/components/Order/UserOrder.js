import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Header from '../Layout/Header';
import {useDispatch, useSelector} from 'react-redux';
import {getUserOrders} from '../../../Redux/Actions/OrderAction';
import {useEffect} from 'react';

var {width} = Dimensions.get('window');

export default function UserOrder({navigation}) {
  const {error, orders} = useSelector(state => state.orderData);

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      console.log(error);
    }

    dispatch(getUserOrders());
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
        orders &&
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
                  {item.orderItems.length === 0 ? 1 : item.orderItems.length}
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: '#333'}}>Amount</Text>
                <Text style={{color: '#333'}}>${item.totalPrice}</Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: '#333'}}>Order Items</Text>
                  <Text style={{color: '#333'}}>
                    {item.orderItems[0].name}...
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
