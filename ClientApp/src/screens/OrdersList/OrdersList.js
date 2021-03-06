import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { OrdersList } from "../../components/OrdersList";
import { getOrdersList } from "../../redux/orders/selectors";
import { ProtectedComponent } from "../../components/ProtectedComponent";
import {useFetch} from "../../hooks/useFetch";
import {setOrders} from "../../redux/orders/actions";
import {isRequestSuccessed} from "../../utils/request";

const useStyles = makeStyles(theme => ({
  root: {
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

const mapOrders = (orders, stores) => {
  return orders.map(({ timeCreated, id, state, storeId, products }) => {
      const store = stores.find(({ id }) => id === storeId);

      return {
        orderId: id,
        state,
        storeName: store.name,
        orderStatus: state,
        orderDate: new Date(timeCreated).toDateString(),
        orderPrice: '',
        items: products,
      };
    })
};

export const OrdersListScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const orders = useSelector(getOrdersList);
  const [ordersRequest, makeOrdersRequest, clearOrdersRequest] = useFetch({
    url: '/api/orders',
  });
  const [storesRequest, makeStoresRequest, clearStoresRequest] = useFetch({
    url: '/api/stores',
  });

  useEffect(() => {
    makeOrdersRequest();
    makeStoresRequest();
  }, []);

  useEffect(() => {
    if (isRequestSuccessed(ordersRequest) && isRequestSuccessed(storesRequest)) {
      dispatch(setOrders(mapOrders(ordersRequest.data, storesRequest.data)));

      clearOrdersRequest();
      clearStoresRequest();
    }
  }, [ordersRequest]);

  return (
      <ProtectedComponent>
        <div className={classes.root}>
          <Typography variant="h4" component="h3" className={classes.header}>
            Twoje zamówienia
          </Typography>
          <OrdersList orders={orders} />
        </div>
      </ProtectedComponent>
  );
};

export default OrdersListScreen;
