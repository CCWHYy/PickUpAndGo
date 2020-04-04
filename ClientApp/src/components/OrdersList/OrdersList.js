import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { Order } from "../Order";

const useStyles = makeStyles(theme => ({
  emptyList: {
    textAlign: "center"
  }
}));

export const OrdersList = ({ orders }) => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      {orders.map(order => (
        <Order {...order} />
      ))}
      {(!orders || !orders.length) && (
        <Typography
          className={classes.emptyList}
          variant="body2"
          component="p"
        >
          Nie posiadasz żadnych zamówień
        </Typography>
      )}
    </Container>
  );
};

export default OrdersList;
