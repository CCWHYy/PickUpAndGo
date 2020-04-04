import { combineReducers } from "@reduxjs/toolkit";

import { reducer as cartReducer } from "./cart/reducer";

export const rootReducer = combineReducers({
    cart: cartReducer,
});

export default rootReducer;
