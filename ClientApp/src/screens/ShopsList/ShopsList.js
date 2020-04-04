import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

import { ShopsList } from "../../components/ShopsList";

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

const shops = [
    {
        name: 'Żabka',
        location: 'Rynek 16',
        logoImg: '/shopLogos/zabka.jpeg',
        description: 'Godziny otwarcia',
    }, {
        name: 'Żabka',
        location: 'Rynek 16',
        logoImg: '/shopLogos/zabka.jpeg',
        description: 'Godziny otwarcia',
    }, {
        name: 'Żabka',
        location: 'Rynek 16',
        logoImg: '/shopLogos/zabka.jpeg',
        description: 'Godziny otwarcia',
    }, {
        name: 'Żabka',
        location: 'Rynek 16',
        logoImg: '/shopLogos/zabka.jpeg',
        description: 'Godziny otwarcia',
    }, {
        name: 'Żabka',
        location: 'Rynek 16',
        logoImg: '/shopLogos/zabka.jpeg',
        description: 'Godziny otwarcia',
    },
];

export const ShopsListScreen = () => {
    const classes = useStyles();

    return (
        <div className={ classes.root }>
            <Typography variant="h4" component="h3" className={ classes.header }>
                Sklepy w twojej okolicy
            </Typography>
            <ShopsList shops={ shops } />
        </div>
    );
};

export default ShopsListScreen;
