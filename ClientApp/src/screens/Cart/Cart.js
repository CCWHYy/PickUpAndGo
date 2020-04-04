import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

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
import { makeOrder } from "../../redux/orders/actions";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CartScreen = ({ open, handleClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const items = useSelector(getCartItems);
  const storeDetails = useSelector(getDetails);

  const handleMakeOrder = () => {
    const order = {
      store: storeDetails,
      storeName: storeDetails.name,
      orderStatus: 'W trakcie realizacji',
      orderDate: '03.04.2020',
      orderPrice: '58.80 PLN',
      items,
      qrCode: '/shopLogos/zabka.jpeg',
    };

    dispatch(makeOrder(order));

    history.push('/orders');
    handleClose();
  };

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
          onClick={ handleMakeOrder }
        >
          <CreditCard className={classes.extendedIcon} />
        </Fab>
      </Tooltip>
    </Dialog>
  );
};

export default CartScreen;
