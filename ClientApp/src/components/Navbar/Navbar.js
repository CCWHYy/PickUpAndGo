import React from "react";
import { useHistory } from "react-router-dom";

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

  const goTo = url => () => {
    history.push(url);
  };

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
            <ShoppingCart />
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
