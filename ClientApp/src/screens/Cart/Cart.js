import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import { CreditCard } from "@material-ui/icons";

import { ItemsList } from "../../components/ItemsList";
import { CartItem } from "../../components/Item";
import { getCartItems } from "../../redux/cart/selectors";
import { getDetails } from "../../redux/store/selectors";
import { getDetails as getUserDetails } from "../../redux/auth/selectors";
import { setCartItems } from "../../redux/cart/actions";
import {useFetch} from "../../hooks/useFetch";
import {isRequestSuccessed} from "../../utils/request";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "sticky"
  },
  container: {
    paddingTop: theme.spacing(2)
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  }
}));

const mapItems = (items) => items.map(({ id, quantity }) => {
  return {
    id,
    quantity,
  };
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CartScreen = ({ open, handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const items = useSelector(getCartItems);
  const storeDetails = useSelector(getDetails);
  const userDetails = useSelector(getUserDetails);
  const [request, makeRequest] = useFetch({
    url: '/api/orders',
    options: {
      method: 'POST',
      body: JSON.stringify({
        userId: userDetails && userDetails.id,
        storeId: storeDetails && storeDetails.id,
        products: mapItems(items),
      }),
    },
  });

  useEffect(() => {
    if (isRequestSuccessed(request)) {
      dispatch(setCartItems());

      history.push("/orders");
      handleClose();
    }
  }, [request]);

  const handleMakeOrder = () => makeRequest();

  return (
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                Twój koszyk
              </Typography>
            </Toolbar>
          </AppBar>
          <ItemsList items={items} ItemComponent={CartItem} />
          <Tooltip
            title="Przejdź do płatności"
            aria-label="Przejdź do płatności"
            placement="left"
          >
            <Fab
              aria-label="Przejdź do płatności"
              color="secondary"
              className={classes.fab}
              onClick={handleMakeOrder}
            >
              <CreditCard className={classes.extendedIcon} />
            </Fab>
          </Tooltip>
        </Dialog>
  );
};

export default CartScreen;
