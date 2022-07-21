import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import ProductCard from '../Home/ProductCard';
import {getWishList} from '../../../Redux/Actions/ProductAction';

var {width} = Dimensions.get('window');

const categories = [
  {
    id: 1,
    name: 'All',
  },
  {
    id: 2,
    name: 'Personal',
  },
  {
    id: 3,
    name: 'cloth',
  },
  {
    id: 4,
    name: 'Ladies Cloth',
  },
  {
    id: 5,
    name: 'Gift',
  },
  {
    id: 6,
    name: 'Food',
  },
  {
    id: 7,
    name: 'Electronics',
  },
  {
    id: 8,
    name: 'Sports',
  },
];

export default function FilterProducts({navigation}) {
  const {products} = useSelector(state => state.products);
  const {wishlistData} = useSelector(state => state.wishList);
  const [active, setActive] = useState('All');
  const [data, setData] = useState(products);

  const productsFilter = active => {
    if (active !== 'All') {
      setData([...products.filter(item => item.category === active)]);
    } else {
      setData(products);
    }
    setActive(active);
  };

  return (
    <View>
      <ScrollView
        style={{
          flexDirection: 'row',
          marginVertical: 10,
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        {categories.map((i, index) => (
          <TouchableOpacity
            onPress={() => productsFilter(i.name)}
            style={[styles.name, active === i.name && styles.nameActive]}
            key={index}>
            <Text style={{color: '#fff'}}>{i.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.productCard}>
        {data.length === 0 ? (
          <Text style={{color: '#000', marginTop: 100, fontSize: 16}}>
            No Products Found!
          </Text>
        ) : (
          <>
            {data &&
              data.map(product => (
                <ProductCard
                  key={product._id}
                  product={product}
                  navigation={navigation}
                  wishlistData={wishlistData}
                />
              ))}
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  name: {
    borderRadius: 15,
    backgroundColor: 'crimson',
    marginHorizontal: 5,
    paddingHorizontal: 8,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  nameActive: {
    backgroundColor: '#000',
  },
  productCard: {
    width: width * 1 - 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
