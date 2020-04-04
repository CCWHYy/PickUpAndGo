import React from 'react';

import {makeStyles} from "@material-ui/core/styles";

import { OrdersList } from "../../components/OrdersList";
import Typography from "@material-ui/core/Typography";

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

const orders = [
    {
        storeName: 'Żabka',
        orderStatus: 'W trakcie realizacji',
        orderDate: '03.04.2020',
        orderPrice: '58.80 PLN',
        items: [
            {
                name: 'Bułeczki',
                price: '1.90 PLN',
                description: 'przepyszne bułeczki',
            }, {
                name: 'Wódeczka',
                price: '21.90 PLN',
                description: 'przepyszna wódeczka',
            },
        ],
        qrCode: '/shopLogos/zabka.jpeg',
    }, {
        storeName: 'Żabka',
        orderStatus: 'W trakcie realizacji',
        orderDate: '03.04.2020',
        orderPrice: '58.80 PLN',
        items: [
            {
                name: 'Bułeczki',
                price: '1.90 PLN',
                description: 'przepyszne bułeczki',
            }, {
                name: 'Wódeczka',
                price: '21.90 PLN',
                description: 'przepyszna wódeczka',
            },
        ],
        qrCode: '/shopLogos/zabka.jpeg',
    },
];

export const OrdersListScreen = () => {
    const classes = useStyles();

    return (
        <div className={ classes.root }>
            <Typography variant="h4" component="h3" className={ classes.header }>
                Twoje zamówienia
            </Typography>
            <OrdersList orders={ orders } />
        </div>
    );
}

export default OrdersListScreen;
