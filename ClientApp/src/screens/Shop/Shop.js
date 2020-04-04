import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { ItemsList } from "../../components/ItemsList";
import { ShopItem } from "../../components/Item";
import { setStoreItems } from "../../redux/store/actions";
import { getStoreItems } from "../../redux/store/selectors";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 16,
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

const items = [
    {
        id: 1,
        name: 'Bułeczki',
        price: '1.90 PLN',
        description: 'przepyszne bułeczki',
    }, {
        id: 2,
        name: 'Wódeczka',
        price: '21.90 PLN',
        description: 'przepyszna wódeczka',
    },
];

export const ShopScreen = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const storeItems = useSelector(getStoreItems);

    useEffect(() => {
        dispatch(setStoreItems(items));
    }, []);

    return (
        <div className={ classes.root }>
            <ItemsList items={ storeItems } ItemComponent={ShopItem} />
        </div>
    );
}

export default ShopScreen;
