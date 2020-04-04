import React from 'react';

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";


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

export const AdminStoreDetailsScreen = () => {
    const classes = useStyles();

    return (
        <div className={ classes.root }>
            <Typography variant="h4" component="h3" className={ classes.header }>
                Twój sklep
            </Typography>
        </div>
    );
};

export default AdminStoreDetailsScreen;
