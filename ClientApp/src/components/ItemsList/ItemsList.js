import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 500,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  header: {
    margin: 16,
    textAlign: "center"
  }
}));

export const ItemsList = ({ items = [], ItemComponent }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Typography variant="h5" component="h5" className={classes.header}>
        Lista produktów
      </Typography>
      <List>
        {items.map(item => (
          <React.Fragment>
            <ItemComponent {...item} />
            <Divider variant="middle" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Card>
  );
};

export default ItemsList;
