import {configureStore} from '@reduxjs/toolkit';
import {newOrderReducer, orderDataReducer} from './Reducers/OrderReducer';
import {
  cartAddReducer,
  cartDataReducer,
  cartRemoveReducer,
  cartUpdateReducer,
  productsReducer,
  wishListaddReducer,
  wishListDataReducer,
  wishListRemoveReducer,
} from './Reducers/ProductReducer';
import {forgotPasswordReducer, updateProfileReducer, userReducer} from './Reducers/UserReducer';

const Store = configureStore({
  reducer: {
    products: productsReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    wishListRemove: wishListRemoveReducer,
    wishListAdd: wishListaddReducer,
    wishList: wishListDataReducer,
    cart: cartDataReducer,
    cartAdd: cartAddReducer,
    cartRemove: cartRemoveReducer,
    cartUpdate: cartUpdateReducer,
    orderNew: newOrderReducer,
    orderData: orderDataReducer,
    updateProfile: updateProfileReducer,
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }),
});
export default Store;
