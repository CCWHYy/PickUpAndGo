import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import { OrderItem } from "../Item";
import { QRModal } from "../QRMoral";
import { ItemsList } from "../ItemsList";

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "80%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "20%",
    color: theme.palette.text.secondary
  },
  details: {
    display: "flex",
    flexFlow: "column"
  },
  divider: {
    margin: "16px 0"
  }
}));

export const Order = ({
  storeName,
  orderStatus,
  orderDate,
  orderPrice,
  items,
  qrCode
}) => {
  const [isQROpen, setQROpen] = useState(false);
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const handleChange = () => {
    setExpanded(!expanded);
  };
  const openQRModal = () => {
    setQROpen(true);
  };
  const closeQRModal = () => {
    setQROpen(false);
  };

  return (
    <ExpansionPanel expanded={expanded} onChange={handleChange}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography className={classes.heading}>
          <div>{storeName}</div>
          <div>{orderStatus}</div>
        </Typography>
        <Typography className={classes.secondaryHeading}>
          <div>{orderDate}</div>
          <div>{orderPrice}</div>
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        <Button
          href=""
          color="primary"
          variant="contained"
          onClick={openQRModal}
        >
          Pokaż kod QR
        </Button>
        <Divider component="p" className={classes.divider} />
        <ItemsList items={items} ItemComponent={OrderItem} />
      </ExpansionPanelDetails>
      <QRModal qrUrl={qrCode} open={isQROpen} onClose={closeQRModal} />
    </ExpansionPanel>
  );
};

export default Order;
