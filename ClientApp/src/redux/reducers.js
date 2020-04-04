import { combineReducers } from "@reduxjs/toolkit";

import { reducer as cartReducer } from "./cart/reducer";
import { reducer as storeReducer } from "./store/reducer";

export const rootReducer = combineReducers({
    cart: cartReducer,
    store: storeReducer,
});

export default rootReducer;
