import {createReducer} from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
};

export const productsReducer = createReducer(initialState, {
  allProductRequest: state => {
    state.loading = true;
  },
  allProductSuccess: (state, action) => {
    (state.loading = false),
      (state.products = action.payload.products),
      (state.productsCount = action.payload.productsCount);
    state.resultPerPage = action.payload.resultPerPage;
    state.filteredProductsCount = action.payload.filteredProductsCount;
  },
  allProductFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});

// wishList add reducer
export const wishListaddReducer = createReducer(initialState, {
  addWishListRequest: state => {
    state.loading = true;
  },
  addWishListSuccess: (state, action) => {
    state.loading = false;
    state.wishlistData = action.payload;
  },
  addWishListFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});

// wishlist data reducer
export const wishListDataReducer = createReducer(initialState, {
  getWishListRequest: state => {
    state.loading = true;
  },
  getWishListSuccess: (state, action) => {
    state.loading = false;
    state.wishlistData = action.payload;
  },
  getWishListFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});

// wishlist remove reducer
export const wishListRemoveReducer = createReducer(initialState, {
  removeWishListRequest: state => {
    state.loading = true;
  },
  removeWishListSuccess: (state, action) => {
    state.loading = false;
    state.wishlistData = action.payload;
  },
  removeWishListFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});

// cart add reducer
export const cartAddReducer = createReducer(initialState, {
  addCartRequest: state => {
    state.loading = true;
  },
  addCartSuccess: (state, action) => {
    state.loading = false;
    state.cart = action.payload;
  },
  addCartFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});

// cart data reducer
export const cartDataReducer = createReducer(initialState, {
  getCartRequest: state => {
    state.loading = true;
  },
  getCartSuccess: (state, action) => {
    state.loading = false;
    state.cartData = action.payload.cartData;
  },
  getCartFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});

// cart remove reducer
export const cartRemoveReducer = createReducer(initialState, {
  removeCartRequest: state => {
    state.loading = true;
  },
  removeCartSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
  },
  removeCartFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});

// cart Update reducer
export const cartUpdateReducer = createReducer(initialState, {
  updateCartRequest: state => {
    state.loading = true;
  },
  updateCartSuccess: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
  },
  updateCartFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});

// create review reducer
export const createReviewReducer = createReducer(initialState, {
  createReviewRequest: state => {
    state.loading = true;
  },
  createReviewSuccess: (state, action) => {
    state.loading = false;
    state.success = action.payload;
  },
  createReviewFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  }
});