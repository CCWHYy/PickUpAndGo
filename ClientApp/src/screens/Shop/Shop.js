import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { ItemsList } from "../../components/ItemsList";
import { setStoreItems } from "../../redux/store/actions";
import { getStoreItems } from "../../redux/store/selectors";

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

const items = [
    {
        name: 'Bułeczki',
        price: '1.90 PLN',
        description: 'przepyszne bułeczki',
    }, {
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
            <Typography variant="h4" component="h3" className={ classes.header }>
                Lista produktów
            </Typography>
            <ItemsList items={ storeItems } />
        </div>
    );
}

export default ShopScreen;
