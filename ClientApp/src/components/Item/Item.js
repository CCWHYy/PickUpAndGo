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
    description: {
        display: 'flex',
        flexFlow: 'column',
    },
    buyActions: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
}));

export const Item = ({ name, price, description }) => {
    const classes = useStyles();

    return (
        <ListItem alignItems="flex-start" className={ classes.item }>
            <ListItemText
                primary={ name }
                secondary={
                    <div className={ classes.description }>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            { price }
                        </Typography>
                        { description }
                    </div>
                }
            />
            <div className={ classes.buyActions }>
                <Input type="number" defaultValue={ 1 } inputProps={{ min: 0, max: 99, className: classes.input }} className={ classes.quantity } />
                <IconButton edge="end" aria-label="comments">
                    <AddIcon />
                </IconButton>
            </div>
        </ListItem>
    );
};

export default Item;
