import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
};

//   new order reducer
export const newOrderReducer = createReducer(initialState, {
  newOrderRequest: state => {
    state.loading = true;
  },
  newOrderSuccess: (state, action) => {
    state.loading = false;
    state.order = action.payload;
  },
  newOrderFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  clearError: (state = {}) => {
    state.error = null;
  },
});

// order data reducer
export const orderDataReducer = createReducer(initialState, {
  orderDataRequest: state => {
    state.loading = true;
  },
  orderDataSuccess: (state, action) => {
    state.loading = false;
    state.orders = action.payload;
  },
  orderDataFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});

