import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";

import { ShopsList } from "../../components/ShopsList";
import { getStoresList } from "../../redux/store/selectors";
import { setStoresList } from "../../redux/store/actions";

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
    const dispatch = useDispatch();
    const shopsList = useSelector(getStoresList);

    useEffect(() => {
        dispatch(setStoresList(shops))
    }, []);

    return (
        <div className={ classes.root }>
            <Typography variant="h4" component="h3" className={ classes.header }>
                Sklepy w twojej okolicy
            </Typography>
            <ShopsList shops={ shopsList } />
        </div>
    );
};

export default ShopsListScreen;
