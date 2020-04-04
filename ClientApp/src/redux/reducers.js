import { combineReducers } from "@reduxjs/toolkit";

import { reducer as cartReducer } from "./cart/reducer";
import { reducer as storeReducer } from "./store/reducer";
import { reducer as ordersReducer } from "./orders/reducer";

export const rootReducer = combineReducers({
  cart: cartReducer,
  store: storeReducer,
  orders: ordersReducer
});

export default rootReducer;
