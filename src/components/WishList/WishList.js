import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addCart, getCart} from '../../../Redux/Actions/ProductAction';
import {useState} from 'react';

var {width} = Dimensions.get('window');
var height = Dimensions.get('window').height;

export default function WishList({navigation}) {
  const {wishlistData} = useSelector(state => state.wishList);
  const {cartData} = useSelector(state => state.cart);

  const {user} = useSelector(state => state.user);

  const [itemId, setItemId] = useState('');

  const dispatch = useDispatch();

  // add to cart
  const addToCartHandler = async (
    productName,
    productImage,
    productPrice,
    userId,
    productId,
    Stock,
  ) => {
    let quantity = 1;
    if (Stock === 0 || productId === itemId) {
      ToastAndroid.showWithGravity(
        productId === itemId
          ? `${productName} already have in cart`
          : `${productName} out of stock`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } else {
      await dispatch(
        addCart(
          productName,
          quantity,
          productImage,
          productPrice,
          userId,
          productId,
          Stock,
        ),
      );
      ToastAndroid.showWithGravity(
        `${productName} added to cart`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  useEffect(() => {
    cartData.map(item => {
      setItemId(item.productId);
    }); 
  }, [dispatch, cartData]);

  return (
    <View>
      {wishlistData.length > 0 ? (
        <View>
          {wishlistData.map((product, index) => (
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
                source={{uri: product.productImage}}
                style={{width: 60, height: 60}}
              />
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  width: width / 3.3,
                }}>
                <Text style={styles.productName}>{product.productName}</Text>
              </View>
              <View>
                <Text style={styles.productPrice}>
                  $ {product.productPrice}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  width: 110,
                  height: width * 0.1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#000',
                  marginLeft: width * 0.04,
                  borderRadius: 5,
                  marginRight: width * 0.05,
                }}
                onPress={() =>
                  addToCartHandler(
                    product.productName,
                    product.productImage,
                    product.productPrice,
                    user._id,
                    product._id,
                    product.Stock,
                  )
                }>
                <Text style={{color: '#fff', fontSize: 16}}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ) : (
        <View
          style={{
            height: height * 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#333', fontSize: 20, textAlign: 'center'}}>
            Your wishList is empty 😢
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
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 22,
    color: '#333',
    fontWeight: '700',
  },
});
