import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { green } from "@material-ui/core/colors";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

import { setDetails } from "../../redux/store/actions";

const useStyles = makeStyles(theme => ({
  root: {
    margin: 8,
    width: 284
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  avatar: {
    backgroundColor: green[800]
  },
  goToShop: {
    width: "100%",
    padding: "16px 0"
  }
}));

export const Shop = props => {
  const { name, location, logoImg, description } = props;

  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const goToStore = () => {
    dispatch(setDetails(props));
    history.push("/shop");
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            Ż
          </Avatar>
        }
        title={name}
        subheader={location}
      />
      <CardMedia className={classes.media} image={logoImg} title={name} />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="div">
          {description}
        </Typography>
      </CardContent>
      <Button
        className={classes.goToShop}
        color="primary"
        variant="contained"
        onClick={goToStore}
      >
        Przejdź do oferty
        <ArrowForwardIosIcon />
      </Button>
    </Card>
  );
};

export default Shop;
