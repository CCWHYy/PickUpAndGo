import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Dialog from "@material-ui/core/Dialog";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        maxHeight: 400,
    },
    media: {
        width: 400,
        height: 400,
    },
});

export const QRModal = ({ qrUrl, onClose, open }) => {
    const classes = useStyles();

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <Card className={ classes.root }>
                <CardMedia
                    className={ classes.media }
                    image={ qrUrl }
                />
            </Card>
        </Dialog>
    );
};

export default QRModal;
