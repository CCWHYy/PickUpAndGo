import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { Order } from "../Order";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 500,
        marginTop: 16,
    },
    emptyList: {
        textAlign: 'center',
    },
}));

export const OrdersList = ({ orders }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {orders.map((order) => (
                <Order {...order}/>
            ))}
            { (!orders || !orders.length) && (
                <Typography
                    className={ classes.emptyList }
                    variant="body2"
                    component="p"
                >
                    Nie posiadasz żadnych zamówień
                </Typography>
            )}
        </div>
    );
};

export default OrdersList;
