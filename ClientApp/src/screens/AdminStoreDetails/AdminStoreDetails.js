import React, {useState} from 'react';

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexFlow: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        marginTop: 16,
        marginBottom: 16,
        textAlign: 'center',
    },
    form: {
        width: 468,
        padding: '0 16px 16px',
        display: 'flex',
        flexFlow: 'column',
        margin: 16,
    },
    field: {
        margin: 4,
    }
}));

export const AdminStoreDetailsScreen = () => {
    const classes = useStyles();
    const [isSnackbarOpen, makeSnackbarOpen] = useState(false);

    const handleDetailsUpdate = () => {
        makeSnackbarOpen(true);
    };
    const handleSnackbarClose = () => makeSnackbarOpen(false);

    return (
        <div className={ classes.root }>
            <Card className={ classes.form }>
                <Typography variant="h4" component="h3" className={ classes.header }>
                    Edytuj szczegóły sklepu
                </Typography>
                <TextField
                    label="Nazwa sklepu"
                    color="secondary"
                    className={ classes.field }
                />
                <TextField
                    color="secondary"
                    label="Opis sklepu"
                    className={ classes.field }
                />
                <Button
                    href=""
                    variant="contained"
                    color="secondary"
                    className={ classes.field }
                    onClick={ handleDetailsUpdate }
                >
                    Zaktualizuj
                </Button>
            </Card>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={isSnackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message="Zaktualizowano informacje o sklepie"
            />
        </div>
    );
};

export default AdminStoreDetailsScreen;
