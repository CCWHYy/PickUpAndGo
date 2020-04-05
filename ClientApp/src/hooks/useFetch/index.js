import { merge } from 'lodash';
import { useSafeReducer } from "../useSafeReducer";
import { types, initialState, reducer } from "./requestReducer";
import { getStorageToken } from "../../utils/localStorage";

const HOST_URL = 'https://pickupandgo20200404185015.azurewebsites.net';

export const useFetch = ({ url, options = {} }) => {
  const [{ error, pending, data }, dispatch] = useSafeReducer(
    reducer,
    initialState
  );
  const token = getStorageToken();

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
};

  const makeRequest = async () => {
    dispatch({ type: types.REQUEST });
    try {
      const opt = merge(defaultOptions, options);
      const response = await fetch(`${HOST_URL}${url}`, opt);
      if (!response.ok) {
        throw response;
      }

      dispatch({ type: types.SUCCESS, payload: await response.json() });
    } catch (err) {
      console.log(err);
      if (err.status === 401) {
        dispatch({
          type: types.FAILURE,
          payload: 'User unauthorized',
        })
      } else {
        dispatch({
          type: types.FAILURE,
          payload: err.json ? await err.json() : err.message
        });
      }
    }
  };

  const cleanRequest = () => {
    dispatch({ type: types.CLEANUP });
  };

  return [{ error, pending, data }, makeRequest, cleanRequest];
};

export default useFetch;
