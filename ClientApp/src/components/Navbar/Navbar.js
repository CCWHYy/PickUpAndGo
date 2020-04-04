import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from "@material-ui/core";
import {
  AccountCircle,
  Menu,
  ShoppingCart,
  Storefront
} from "@material-ui/icons";

import { CartScreen } from "../../screens/Cart";
import { theme } from "../../theme";
import Badge from "@material-ui/core/Badge";
import { getCartItems } from "../../redux/cart/selectors";

const useStyles = makeStyles({
  title: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  }
});

export const Navbar = ({ items = [] }) => {
  const classes = useStyles();
  const [drawer, setDrawer] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);
  const history = useHistory();
  const cartItems = useSelector(getCartItems);

  const goTo = url => () => {
    history.push(url);
    setDrawer(false);
  };

  let productsNum = 0;
  cartItems.forEach(({ quantity }) => { productsNum += quantity });

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawer(!drawer)}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Łapu-Capu
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="account"
            onClick={() => setCartOpen(!cartOpen)}
          >
            <Badge badgeContent={productsNum} color="secondary">
            <ShoppingCart />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer open={drawer} onClose={() => setDrawer(false)}>
        <List component="nav" aria-label="main mailbox folders">
          <ListItem button onClick={goTo("/shops")}>
            <ListItemIcon>
              <Storefront />
            </ListItemIcon>
            <ListItemText primary="Sklepy" />
          </ListItem>
          <ListItem button onClick={goTo("/orders")}>
            <ListItemIcon>
              <AccountCircle />
            </ListItemIcon>
            <ListItemText primary="Twoje konto" />
          </ListItem>
        </List>
      </Drawer>
      <CartScreen open={cartOpen} handleClose={() => setCartOpen(false)} />
    </div>
  );
};

export default Navbar;
