import {
  SET_TOKEN,
  SET_DETAILS
} from "./types";

export const setToken = token => ({
  type: SET_TOKEN,
  payload: token,
});

export const setDetails = details => ({
  type: SET_DETAILS,
  payload: details,
});
