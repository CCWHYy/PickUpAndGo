import React from 'react';
import {  useSelector } from "react-redux";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { OrdersList } from "../../components/OrdersList";
import { getOrdersList } from "../../redux/orders/selectors";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        marginTop: 32,
        marginBottom: 16,
    },
}));

export const OrdersListScreen = () => {
    const classes = useStyles();
    const orders = useSelector(getOrdersList);

    return (
        <div className={ classes.root }>
            <Typography variant="h4" component="h3" className={ classes.header }>
                Twoje zamówienia
            </Typography>
            <OrdersList orders={ orders }/>
        </div>
    );
};

export default OrdersListScreen;
