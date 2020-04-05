import React from "react";
// import { useSelector } from "react-redux";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { OrdersList } from "../../components/OrdersList";
// import { getOrdersList } from "../../redux/orders/selectors";
import { ProtectedComponent } from "../../components/ProtectedComponent";

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

const order = [
  {
    storeName: "Żabka",
    orderStatus: "W trakcie realizacji",
    orderDate: "03.04.2020",
    orderPrice: "58.80",
    items: [],
    qrCode: "/shopLogos/zabka.jpeg"
  }
];

export const AdminStoreOrdersScreen = () => {
  const classes = useStyles();
  // const orders = useSelector(getOrdersList);

  return (
      <ProtectedComponent>
        <div className={classes.root}>
          <Typography variant="h4" component="h3" className={classes.header}>
            Twoje zamówienia
          </Typography>
          <OrdersList orders={order} />
        </div>
      </ProtectedComponent>
  );
};

export default AdminStoreOrdersScreen;
