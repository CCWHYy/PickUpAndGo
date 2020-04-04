import { SET_ORDERS, MAKE_ORDER } from "./types";

export const setOrders = items => ({
  type: SET_ORDERS,
  payload: items
});

export const makeOrder = item => ({
  type: MAKE_ORDER,
  payload: item
});
