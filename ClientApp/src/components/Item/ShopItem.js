import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import { Item } from "./Item";
import { addItemToCart } from "../../redux/cart/actions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles(theme => ({
  quantity: {
    marginRight: 8,
    display: "inline"
  },
  buyActions: {
    marginLeft: 32,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8
  }
}));

export const ShopItem = props => {
  const [details, makeDetails] = useState({});
  const [isSnackbarOpen, makeSnackbarOpen] = useState(false);
  const dispatch = useDispatch();
  const { name, price, description, id, quantity = 1, quantityUnit } = props;

  useEffect(() => {
    makeDetails({
      name,
      price,
      description,
      id,
      quantity,
      quantityUnit,
    });
  }, [name, price, description, id, quantity, quantityUnit]);

  const addItemsToCart = () => {
    dispatch(addItemToCart(details));
    makeSnackbarOpen(true);
  };

  const updateQuantity = q => {
    makeDetails({
      ...details,
      quantity: Number(q.target.value)
    });
  };

  const handleClose = () => {
    makeSnackbarOpen(false);
  };

  const classes = useStyles();
  return (
    <Item
      ContentAfter={
        <div className={classes.buyActions}>
          <Input
            type="number"
            value={details.quantity}
            inputProps={{ min: 0, max: 99, className: classes.input }}
            className={classes.quantity}
            onChange={updateQuantity}
          />
          {quantityUnit}
          <IconButton
            edge="end"
            aria-label="comments"
            onClick={addItemsToCart}
          >
            <AddIcon />
          </IconButton>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={isSnackbarOpen}
            autoHideDuration={6000}
            onClose={handleClose}
            message={`Dodano ${details.quantity}x ${name} do koszyka`}
            action={
              <React.Fragment>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="inherit"
                  onClick={handleClose}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
        </div>
      }
      {...props}
    />
  );
};
