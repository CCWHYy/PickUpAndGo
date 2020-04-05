import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { ShopsList } from "../../components/ShopsList";
import { ProtectedComponent } from "../../components/ProtectedComponent";
import { getStoresList } from "../../redux/store/selectors";
import { setStoresList } from "../../redux/store/actions";
import { useFetch } from "../../hooks/useFetch";
import { isRequestSuccessed } from "../../utils/request";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    marginTop: 32,
    marginBottom: 16
  }
}));

export const ShopsListScreen = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const shopsList = useSelector(getStoresList);

  const [request, makeRequest, clearRequest] = useFetch({
    url: '/api/stores',
  });

  useEffect(() => {
    makeRequest();
  }, []);

  useEffect(() => {
    if (isRequestSuccessed(request)) {
      dispatch(setStoresList(request.data));
      clearRequest();
    }
  }, [request]);

  return (
      <ProtectedComponent>
        <div className={classes.root}>
          <Typography variant="h4" component="h3" className={classes.header}>
            Sklepy w twojej okolicy
          </Typography>
          <ShopsList shops={shopsList} />
        </div>
      </ProtectedComponent>
    );
};

export default ShopsListScreen;
