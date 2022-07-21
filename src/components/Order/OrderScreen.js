import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../Layout/Header';
import Order from '../../components/Order/Order';
import {URI} from "../../../Redux/URI";
import {StripeProvider} from '@stripe/stripe-react-native';
import axios from 'axios';

export default function OrderScreen({navigation}) {
   const [publishableKey, setpublisheableKey] = useState("");
   async function getStripeApiKey() {
    const {data} = await axios.get(`${URI}/api/v2/stripeapikey`);
    setpublisheableKey(data.stripeApiKey);
   }
   useEffect(() => {
    getStripeApiKey();
   }, [])
   
   
  return (
    <StripeProvider publishableKey={publishableKey}>
      <Header navigation={navigation} />
      <Order navigation={navigation} />
      </StripeProvider>
  );
}
