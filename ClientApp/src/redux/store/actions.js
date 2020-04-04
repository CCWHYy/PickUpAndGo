import { SET_STORE_ITEMS, SET_STORES_LIST, SET_DETAILS } from "./types";

export const setStoreItems = items => ({
  type: SET_STORE_ITEMS,
  payload: items
});

export const setStoresList = items => ({
  type: SET_STORES_LIST,
  payload: items
});

export const setDetails = details => ({
  type: SET_DETAILS,
  payload: details
});
