import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";

import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

import { Item } from "./Item";
import { EditItemModal } from "../EditItemModal";

const useStyles = makeStyles((theme) => ({
    quantity: {
        marginRight: 8,
        display: 'inline',
    },
    editActions: {
        marginLeft: 32,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
}));

export const AdminItem = (props) => {
    const { name, price, description, id } = props;
    const [isEditOpen, setEditOpen] = useState(false);

    const classes = useStyles();
    const dispatch = useDispatch();
    const [details, makeDetails] = useState({});

    useEffect(() => {
        makeDetails({ name, price, description, id, quantity: props.quantity || 1 });
    }, []);

    const openEditModal = () => {
        setEditOpen(true);
    };
    const closeEditModal = () => {
        setEditOpen(false);
    };

    const editItem = () => {
        openEditModal();
    };

    return (
        <React.Fragment>
            <Item
                ContentAfter={(
                    <div className={ classes.editActions }>
                        <Typography component="span">
                            x{details.quantity}
                        </Typography>
                        <IconButton
                            edge="end"
                            aria-label="comments"
                            onClick={ editItem }
                        >
                            <EditIcon />
                        </IconButton>
                    </div>
                )}
                {...props}
            />
            <EditItemModal details={ details } onClose={ closeEditModal } open={ isEditOpen } />
        </React.Fragment>
    );
};
