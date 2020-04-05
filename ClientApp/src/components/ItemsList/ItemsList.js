import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
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
    <Container maxWidth="md">
      <Typography variant="h5" component="h5" className={classes.header}>
        Lista produktów
      </Typography>
      <List>
        {items && items.map(item => (
          <React.Fragment>
            <ItemComponent {...item} />
            <Divider variant="middle" component="li" />
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default ItemsList;
