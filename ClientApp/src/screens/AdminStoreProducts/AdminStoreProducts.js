import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { ItemsList } from "../../components/ItemsList";
import { AdminItem } from "../../components/Item";
import { useDispatch, useSelector } from "react-redux";
import { getStoreItems } from "../../redux/store/selectors";
import { setStoreItems } from "../../redux/store/actions";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import { ProtectedComponent } from "../../components/ProtectedComponent";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    marginTop: 16,
    marginBottom: 16,
    textAlign: "center"
  },
  form: {
    width: 468,
    padding: "0 16px 16px",
    display: "flex",
    flexFlow: "column",
    margin: 16
  },
  addProduct: {
    marginTop: 16
  }
}));

const items = [
  {
    id: 1,
    name: "Bułeczki",
    price: "1.90",
    description: "przepyszne bułeczki"
  },
  {
    id: 2,
    name: "Wódeczka",
    price: "21.90",
    description: "przepyszna wódeczka"
  }
];

export const AdminStoreProductsScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const storeItems = useSelector(getStoreItems);
  const [isSnackbarOpen, makeSnackbarOpen] = useState(false);

  useEffect(() => {
    dispatch(setStoreItems(items));
  }, [dispatch]);

  const handleAddItem = () => {
    makeSnackbarOpen(true);
  };
  const handleSnackbarClose = () => makeSnackbarOpen(false);

  return (
      <ProtectedComponent>
        <div className={classes.root}>
          <Typography variant="h4" component="h3" className={classes.header}>
            Twoje produkty
          </Typography>
          <Card className={classes.form}>
            <Typography variant="h5" component="h5" className={classes.header}>
              Dodaj produkt
            </Typography>
            <TextField label="Nazwa produktu" color="secondary" />
            <TextField label="Opis produktu (opcjonalnie)" color="secondary" />
            <TextField type="number" label="Ilość" color="secondary" />
            <TextField type="number" label="Cena" color="secondary" />
            <Button
              href=""
              color="secondary"
              variant="contained"
              className={classes.addProduct}
              onClick={handleAddItem}
            >
              Dodaj
            </Button>
          </Card>
          <ItemsList items={storeItems} ItemComponent={AdminItem} />
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            open={isSnackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            message="Zaktualizowano liste produktów"
          />
        </div>
      </ProtectedComponent>
  );
};

export default AdminStoreProductsScreen;
