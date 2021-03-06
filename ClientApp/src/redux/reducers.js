import { combineReducers } from "@reduxjs/toolkit";

import { reducer as cartReducer } from "./cart/reducer";
import { reducer as storeReducer } from "./store/reducer";
import { reducer as ordersReducer } from "./orders/reducer";
import { reducer as authReducer } from "./auth/reducer";

export const rootReducer = combineReducers({
  cart: cartReducer,
  store: storeReducer,
  orders: ordersReducer,
  auth: authReducer,
});

export default rootReducer;
