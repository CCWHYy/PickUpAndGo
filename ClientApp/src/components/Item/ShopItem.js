import React, {useEffect, useState} from 'react';

import {makeStyles} from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";

import { Item } from "./Item";
import {addItemToCart} from "../../redux/cart/actions";
import {useDispatch} from "react-redux";

const useStyles = makeStyles((theme) => ({
    quantity: {
        marginRight: 8,
        display: 'inline',
    },
    buyActions: {
        marginLeft: 32,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
}));

export const ShopItem = (props) => {
    const [details, makeDetails] = useState({});
    const dispatch = useDispatch();
    const { name, price, description, id } = props;

    useEffect(() => {
        makeDetails({ name, price, description, id, quantity: props.quantity || 1 });
    }, []);

    const addItemsToCart = () => {
        dispatch(addItemToCart(details));
    };

    const updateQuantity = (q) => {
        makeDetails({
            ...details,
            quantity: Number(q.target.value),
        })
    };

    const classes = useStyles();
    return (
        <Item
            ContentAfter={(
                <div className={ classes.buyActions }>
                    <Input
                        type="number"
                        value={ details.quantity }
                        inputProps={{ min: 0, max: 99, className: classes.input }}
                        className={ classes.quantity }
                        onChange={ updateQuantity }
                    />
                    <IconButton
                        edge="end"
                        aria-label="comments"
                        onClick={ addItemsToCart }
                    >
                        <AddIcon />
                    </IconButton>
                </div>
            )}
            {...props}
        />
    );
};
