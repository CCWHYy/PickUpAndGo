import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { OrdersList } from "../../components/OrdersList";
import { getOrdersList } from "../../redux/orders/selectors";
import { ProtectedComponent } from "../../components/ProtectedComponent";
import {useFetch} from "../../hooks/useFetch";
import {setOrders} from "../../redux/orders/actions";

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

export const OrdersListScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const orders = useSelector(getOrdersList);
  const [request, makeRequest, clearRequest] = useFetch({
    url: '/api/orders',
  });

  useEffect(() => {
    makeRequest();
  }, []);

  useEffect(() => {
    if (!request.error && !request.pending && request.data) {
      dispatch(setOrders(request.data));
      clearRequest();
    }
  }, [request]);

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
