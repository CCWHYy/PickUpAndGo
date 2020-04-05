import {
  SET_TOKEN,
} from "./types";

const initialState = {
  token: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};