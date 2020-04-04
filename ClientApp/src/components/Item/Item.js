import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

import { addItemToCart } from "../../redux/cart/actions";

const useStyles = makeStyles((theme) => ({
    item: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inline: {
        display: 'inline',
    },
    description: {
        display: 'flex',
        flexFlow: 'column',
    },
}));

export const Item = ({ ContentBefore = null, ContentAfter = null, ...rest }) => {
    const { name, price, description } = rest;
    const classes = useStyles();

    return (
        <ListItem alignItems="flex-start" className={ classes.item }>
            {ContentBefore}
            <ListItemText
                primary={ name }
                secondary={
                    <div className={ classes.description }>
                        { description }
                    </div>
                }
            />
            <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
            >
                { price }
            </Typography>
            {ContentAfter}
        </ListItem>
    );
};

export default Item;
