import { SET_STORE_ITEMS, SET_STORES_LIST, SET_DETAILS } from "./types";

const initialState = {
  items: [],
  storesList: [],
  details: {}
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_STORE_ITEMS:
      return {
        ...state,
        items: [...action.payload]
      };
    case SET_STORES_LIST:
      return {
        ...state,
        storesList: [...action.payload]
      };
    case SET_DETAILS:
      return {
        ...state,
        details: action.payload
      };
    default:
      return state;
  }
};
