import React from "react";
import { useSelector } from "react-redux";

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
import { getCartItems } from "../../redux/cart/selectiors";

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
  const items = useSelector(getCartItems);

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
      <ItemsList items={items} />
      <Tooltip
        title="Przejdź do płatności"
        aria-label="Przejdź do płatności"
        placement="left"
      >
        <Fab
          aria-label="Przejdź do płatności"
          color="primary"
          className={classes.fab}
        >
          <CreditCard className={classes.extendedIcon} />
        </Fab>
      </Tooltip>
    </Dialog>
  );
};

export default CartScreen;
