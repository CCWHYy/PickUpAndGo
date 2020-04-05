import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { ItemsList } from "../../components/ItemsList";
import { AdminItem } from "../../components/Item";
import { getStoreItems } from "../../redux/store/selectors";
import { setStoreItems } from "../../redux/store/actions";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import { ProtectedComponent } from "../../components/ProtectedComponent";
import {useFetch} from "../../hooks/useFetch";
import {isRequestSuccessed} from "../../utils/request";
import { getDetails } from "../../redux/auth/selectors";

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

const mapItems = (items) => items.map(({ id, name, brand, quantity, quantityUnit, price }) => ({
  name,
  price,
  description: brand,
  id,
  quantity: quantity,
  quantityUnit,
}));

export const AdminStoreProductsScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [newItem, makeNewItem] = useState({});
  const storeItems = useSelector(getStoreItems);
  const details = useSelector(getDetails);
  const [isSnackbarOpen, makeSnackbarOpen] = useState(false);
  const [productsRequest, makeProductsRequest, clearProductsRequest] = useFetch({
    url: `/api/products`,
  });
  const [newProductRequest, makeNewProductRequest, clearNewProductRequest] = useFetch({
    url: `/api/products`,
    options: {
      method: 'POST',
      body: JSON.stringify({
        storeId: details && details.storeId,
        name: newItem.name,
        description: newItem.description,
        quantityUnit: newItem.quantityUnit,
        price: newItem.price,
        category: 'xd',
      }),
    }
  });

  useEffect(() => {
      makeProductsRequest();
  }, []);

  useEffect(() => {
    if (isRequestSuccessed(productsRequest)) {
      dispatch(setStoreItems(mapItems(productsRequest.data)));
      clearProductsRequest();
    }
  }, [productsRequest]);

  useEffect(() => {
    if (isRequestSuccessed(newProductRequest)) {
      makeProductsRequest();
      clearNewProductRequest();
    }
  }, [newProductRequest]);

  useEffect(() => {
    dispatch(setStoreItems(storeItems));
  }, []);

  const handleAddItem = () => {
    if (newItem.name && newItem.description && newItem.quantity && newItem.quantityUnit && newItem.price) {
      makeNewProductRequest();
      makeSnackbarOpen(true);
    }
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
            <TextField
                label="Nazwa produktu"
                color="secondary"
                onChange={ (e) => makeNewItem({ ...newItem, name: e.target.value }) }
            />
            <TextField
                label="Opis produktu (opcjonalnie)"
                color="secondary"
                onChange={ (e) => makeNewItem({ ...newItem, description: e.target.value }) }
            />
            <TextField
                type="number"
                label="Ilość"
                color="secondary"
                onChange={ (e) => makeNewItem({ ...newItem, quantity: e.target.value }) }
            />
            <TextField
                label="Jednostka ilości"
                color="secondary"
                onChange={ (e) => makeNewItem({ ...newItem, quantityUnit: e.target.value }) }
            />
            <TextField
                type="number"
                label="Cena"
                color="secondary"
                onChange={ (e) => makeNewItem({ ...newItem, price: e.target.value }) }
            />
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
