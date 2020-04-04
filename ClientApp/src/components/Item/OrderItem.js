import React from 'react';

import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

import { Item } from "./Item";

const useStyles = makeStyles((theme) => ({
    quantity: {
        marginRight: 16,
        display: 'inline',
    },
}));

export const OrderItem = (props) => {
    const classes = useStyles();
    return (
        <Item
            ContentBefore={props.quantity ? (<Typography
                    component="span"
                    variant="h6"
                    className={classes.quantity}
                    color="textPrimary"
                >
                    { props.quantity + "x" }
                </Typography>
            ): null}
            {...props}
        />
    );
};
