import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { Order } from "../Order";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
        textAlign: 'center',
        marginTop: 16,
    },
}));

export const OrdersList = ({ orders }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {orders.map((order) => (
                <Order {...order}/>
            ))}
            { !orders.length && "Nie posiadasz żadnych zamówień"}
        </div>
    );
};

export default OrdersList;
