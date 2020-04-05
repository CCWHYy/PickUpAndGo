import {
  SET_TOKEN,
  SET_DETAILS
} from "./types";

const initialState = {
  token: null,
  details: null,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case SET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    default:
      return state;
  }
};
