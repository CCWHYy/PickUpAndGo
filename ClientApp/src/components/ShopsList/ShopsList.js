import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";

import { Shop } from "../Shop";

const useStyles = makeStyles((theme) => ({
    shopsList: {
        display: 'flex',
        flexWrap: 'wrap',
        maxWidth: 900,
    },
}));

export const ShopsList = ({ shops = [] }) => {
    const classes = useStyles();

    return (
        <List className={classes.shopsList}>
            {shops.map((shop) => (
                <Shop { ...shop }/>
            ))}
        </List>
    );
};

export default ShopsList;
