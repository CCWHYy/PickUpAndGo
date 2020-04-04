import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    maxHeight: 500,
    display: "flex",
    flexFlow: "column",
    padding: 16
  },
  field: {
    margin: 4
  },
  name: {
    margin: 8
  }
});

export const EditItemModal = ({ details, onClose, open }) => {
  const classes = useStyles();

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = () => {
    onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <Card className={classes.root}>
        <Typography component="h5" variant="h5" className={classes.field}>
          Edytujesz produkt
        </Typography>
        <div className={classes.name}>
          {details.name} ({details.description})
        </div>
        <TextField
          type="number"
          label="Ilość"
          color="secondary"
          className={classes.field}
          defaultValue={Number(details.quantity)}
        />
        <TextField
          type="number"
          label="Cena"
          color="secondary"
          defaultValue={Number(details.price)}
          className={classes.field}
          InputProps={{ step: 0.01 }}
        />
        <Button
          variant="contained"
          color="secondary"
          className={classes.field}
          onClick={handleSubmit}
        >
          Zaktualizuj
        </Button>
      </Card>
    </Dialog>
  );
};

export default EditItemModal;
