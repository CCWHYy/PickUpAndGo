import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";


const useStyles = makeStyles((theme) => ({
    item: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inline: {
        display: 'inline',
    },
    quantity: {
        marginRight: 8,
        display: 'inline',
    },
    description: {
        display: 'flex',
        flexFlow: 'column',
    },
    buyActions: {
        marginLeft: 32,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
}));

export const Item = ({ name, price, description, quantity = null, editable = true }) => {
    const classes = useStyles();

    return (
        <ListItem alignItems="flex-start" className={ classes.item }>
            {!editable && quantity && <Typography
                component="span"
                variant="h6"
                className={classes.quantity}
                color="textPrimary"
            >
                { quantity + "x" }
            </Typography>}
            <ListItemText
                primary={ name }
                secondary={
                    <div className={ classes.description }>
                        { description }
                    </div>
                }
            />
            <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
            >
                { price }
            </Typography>
            {editable && <div className={ classes.buyActions }>
                <Input type="number" defaultValue={ 1 } inputProps={{ min: 0, max: 99, className: classes.input }} className={ classes.quantity } />
                <IconButton edge="end" aria-label="comments">
                    <AddIcon />
                </IconButton>
            </div>}
        </ListItem>
    );
};

export default Item;
