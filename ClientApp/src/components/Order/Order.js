import React, { useState } from "react";
import QRCode from "qrcode.react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

import { OrderItem } from "../Item";
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
  },
  qrCode: {
    display: 'flex',
    flexFlow: "column",
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrHeader: {
    marginBottom: 16,
  },
}));

export const Order = ({
  orderId,
  storeName,
  orderStatus,
  orderDate,
  orderPrice,
  items,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const handleChange = () => {
    setExpanded(!expanded);
  };

  return (
    <ExpansionPanel expanded={expanded} onChange={handleChange}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography className={classes.heading}>
          <p>{storeName}</p>
          <p>{orderStatus}</p>
        </Typography>
        <Typography className={classes.secondaryHeading}>
          <p>{orderDate}</p>
          <p>{orderPrice}</p>
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        <Divider component="p" className={classes.divider} />
        </ExpansionPanelDetails>
        <div className={ classes.qrCode }>
          <Typography variant="h5" component="h5" className={ classes.qrHeader }>
            Pokaż kod sprzedawcy
          </Typography>
          <QRCode value={orderId} />
        </div>
        <ItemsList items={items} ItemComponent={OrderItem} />
    </ExpansionPanel>
  );
};

export default Order;
