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
    quantity: {
        marginRight: 8,
        display: 'inline',
    },
    description: {
        display: 'flex',
        flexFlow: 'column',
    },
    buyActions: {
        marginLeft: 32,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
}));

export const Item = (rest, quantity = null, editable = true, isAddButtonVisible = true) => {
    const { name, price, description, id } = rest;
    const [details, makeDetails] = useState({});
    useEffect(() => {
        makeDetails({ name, price, description, id, quantity: rest.quantity || 1 });
    }, []);
    const classes = useStyles();
    const dispatch = useDispatch();

    const addItemsToCart = () => {
        dispatch(addItemToCart(details));
    };

    const updateQuantity = (q) => {
        makeDetails({
            ...details,
            quantity: Number(q.target.value),
        })
    };

    return (
        <ListItem alignItems="flex-start" className={ classes.item }>
            {!editable && quantity && <Typography
                component="span"
                variant="h6"
                className={classes.quantity}
                color="textPrimary"
            >
                { quantity + "x" }
            </Typography>}
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
            {editable && <div className={ classes.buyActions }>
                <Input
                    type="number"
                    value={ details.quantity }
                    inputProps={{ min: 0, max: 99, className: classes.input }}
                    className={ classes.quantity }
                    onChange={ updateQuantity }
                />
                {isAddButtonVisible &&
                <IconButton
                    edge="end"
                    aria-label="comments"
                    onClick={ addItemsToCart }
                >
                    <AddIcon />
                </IconButton>}
            </div>}
        </ListItem>
    );
};

export default Item;
