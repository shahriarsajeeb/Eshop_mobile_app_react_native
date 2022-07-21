import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {removeCart, updateCart} from '../../../Redux/Actions/ProductAction';
import {useEffect} from 'react';

var height = Dimensions.get('window').height;
var width = Dimensions.get('window').width;

export default function Cart({navigation}) {
  const {cartData} = useSelector(state => state.cart);
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  // decrease quantity
  const decreaseQuantity = (id) => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      dispatch(updateCart(id, quantity - 1));
    }
  };

  // increase quantity
  const increaseQuantity = (id, Stock) => {
    if (Stock - 1 < quantity) {
      ToastAndroid.showWithGravity(
        `${items.productName} out of stock`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } else {
      setQuantity(quantity + 1);
        dispatch(updateCart(id, quantity + 1));
    }
  };

  // remove item from cart
  const cartRemoveHandler = (id, name) => {
    ToastAndroid.showWithGravity(
      `${name} removed from cart`,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
    dispatch(removeCart(id));
  };

  useEffect(() => {
    setTotalPrice(
      cartData.reduce(
        (total, item) => total + item.productPrice * item.quantity,
        0,
      ),
    );
    if (cartData.length > 0) {
      cartData.map(item => {
        setQuantity(item.quantity);
      });
    }
  }, [cartData, quantity]);

  return (
    <View>
      {cartData && cartData.length > 0 ? (
        <>
          {cartData &&
            cartData.map((items, index) => (
              <View
                style={{
                  width: width * 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: width * 0.05,
                  paddingVertical: width * 0.05,
                }}
                key={index}>
                <Image
                  source={{uri: items.productImage}}
                  style={{width: 60, height: 60}}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    width: width / 1.8,
                  }}>
                  <Text style={styles.productName}>{items.productName}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                    }}>
                    <TouchableOpacity
                      onPress={() => decreaseQuantity(items._id, items.Stock)}>
                      <View
                        style={[
                          styles.quantityBox,
                          {
                            marginLeft: width * 0.05,
                          },
                        ]}>
                        <Text
                          style={{
                            fontSize: 20,
                            color: '#fff',
                            fontWeight: '800',
                          }}>
                          -
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#333',
                      }}>
                      {quantity.toString()}
                    </Text>
                    <TouchableOpacity
                      onPress={() => increaseQuantity(items._id, items.Stock)}>
                      <View style={styles.quantityBox}>
                        <Text
                          style={{
                            fontSize: 20,
                            color: '#fff',
                            fontWeight: '800',
                          }}>
                          +
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        cartRemoveHandler(items._id, items.productName)
                      }>
                      <Icon
                        name="ios-trash"
                        size={30}
                        color="crimson"
                        style={{marginHorizontal: 10}}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View>
                  <Text style={styles.productPrice}>
                    $ {items.productPrice * quantity}
                  </Text>
                </View>
              </View>
            ))}
          <View>
            <View
              style={{
                width: width * 1,
                height: 1,
                backgroundColor: '#999',
              }}
            />
            <View
              style={{
                width: width * 1,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
                marginVertical: 20,
              }}>
              <Text style={{color: '#333', fontSize: 20, paddingLeft: 15}}>
                Total Price:
              </Text>
              <Text
                style={{
                  color: 'crimson',
                  fontSize: 22,
                  paddingRight: 15,
                  fontWeight: '700',
                }}>
                ${totalPrice}
              </Text>
            </View>
            <View
              style={{
                width: width * 1,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#3BB77E',
                  width: width / 2 + 40,
                  height: 50,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('OrderScreen')}>
                <Text style={{color: '#fff', fontSize: 18, fontWeight: '700'}}>
                  Go to Checkout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : (
        <View
          style={{
            height: height * 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#333', fontSize: 20, textAlign: 'center'}}>
            Your Cart is empty 😢
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  productName: {
    fontSize: 20,
    color: '#333',
    paddingHorizontal: width * 0.05,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 22,
    color: '#333',
    fontWeight: '700',
  },
  quantityBox: {
    width: 35,
    height: 35,
    backgroundColor: '#3BB77E',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});
