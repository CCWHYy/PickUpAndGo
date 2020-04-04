import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";

import { Item } from "../Item";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 500,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export const ItemsList = ({ items = [] }) => {
    const classes = useStyles();

    return (
        <List className={classes.root}>
            {items.map((item) => (
                <React.Fragment >
                    <Item { ...item }/>
                    <Divider variant="middle" component="li" />
                </React.Fragment>
            ))}
        </List>
    );
};

export default ItemsList;
