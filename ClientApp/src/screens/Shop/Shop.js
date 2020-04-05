import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

import { makeStyles } from "@material-ui/core/styles";

import { ItemsList } from "../../components/ItemsList";
import { ShopItem } from "../../components/Item";
import {setStoreItems} from "../../redux/store/actions";
import { getStoreItems, getDetails } from "../../redux/store/selectors";
import { ProtectedComponent } from "../../components/ProtectedComponent";
import {useFetch} from "../../hooks/useFetch";
import { isRequestSuccessed } from "../../utils/request";

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 16,
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    marginTop: 32,
    marginBottom: 16
  }
}));

export const ShopScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const storeItems = useSelector(getStoreItems);
  const details = useSelector(getDetails);

  const [request, makeRequest, clearRequest] = useFetch({
    url: `/api/products?id=${details.id}`,
  });

  useEffect(() => {
    if (details.id) {
      makeRequest();
    } else {
      history.push('/shops');
    }
  }, [details]);

  useEffect(() => {
    if (isRequestSuccessed(request)) {
      dispatch(setStoreItems(request.data));
      clearRequest();
    }
  }, [request]);

  return (
      <ProtectedComponent>
        <div className={classes.root}>
          <ItemsList items={storeItems} ItemComponent={ShopItem} />
        </div>
      </ProtectedComponent>
  );
};

export default ShopScreen;
