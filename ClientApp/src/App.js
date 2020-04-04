import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { Routes } from "./routes";
import rootReducer from "./redux/reducers";
import { theme } from "./theme";

import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import {
  AccountCircle,
  Storefront,
  ShoppingCart,
  Menu
} from "@material-ui/icons";
import { CartScreen } from "./screens/Cart";

const useStyles = makeStyles({
  title: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  }
});

const store = configureStore({ reducer: rootReducer });

const App = () => {
  const classes = useStyles();
  const [drawer, setDrawer] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);

  return (
    <div>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
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
                  PickUpAndGo
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
            <Routes />
            <Drawer open={drawer} onClose={() => setDrawer(false)}>
              <List component="nav" aria-label="main mailbox folders">
                <ListItem button>
                  <ListItemIcon>
                    <Storefront />
                  </ListItemIcon>
                  <ListItemText primary="Sklepy" />
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary="Twoje konto" />
                </ListItem>
              </List>
            </Drawer>
            <CartScreen
              open={cartOpen}
              handleClose={() => setCartOpen(false)}
            />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </div>
  );
};

export default App;
