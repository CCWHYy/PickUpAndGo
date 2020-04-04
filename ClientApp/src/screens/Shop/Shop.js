import React from 'react';

import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { ItemsList } from "../../components/ItemsList";

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

    return (
        <div className={ classes.root }>
            <Typography variant="h4" component="h3" className={ classes.header }>
                Lista produktów
            </Typography>
            <ItemsList items={ items } />
        </div>
    );
}

export default ShopScreen;
