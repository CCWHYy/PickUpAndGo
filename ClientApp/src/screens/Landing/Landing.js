import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { Box, Button, Container, Typography } from "@material-ui/core";
import theme from "../../theme";

import TextField from "@material-ui/core/TextField";

import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";

import FindProducts from "../../images/1_find_products.svg";
import CompletePackage from "../../images/2_complete_package.svg";
import LittleWalk from "../../images/3_little_walk.svg";
import {useFetch} from "../../hooks/useFetch";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import { setToken } from "../../redux/auth/actions";
import { setStorageToken } from "../../utils/localStorage";
import {isRequestSuccessed} from "../../utils/request";

const LandingScreen = () => {
  const [open, setOpen] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const [email, makeEmail] = useState(null);
    const [password, makePassword] = useState(null);
    const [isMissingSnackbarOpen, makeMissingSnackbarOpen] = useState(false);
    const [isErrorSnackbarOpen, makeErrorSnackbarOpen] = useState(false);
    const [request, makeRequest, clearRequest] = useFetch({
        url: '/api/users/login',
        options: {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        },
    });

  useEffect(() => {
    const SEEN_ONBOARDING = "SEEN_ONBOARDING";
    if (localStorage.getItem(SEEN_ONBOARDING) !== "TRUE") {
      setOpen(true);
      localStorage.setItem(SEEN_ONBOARDING, "TRUE");
    }
    setStorageToken(null);
  }, []);

  useEffect(() => {
      if (request.error) {
          makeErrorSnackbarOpen(true);
          clearRequest();
      }
      if (isRequestSuccessed(request)) {
          dispatch(setToken(request.data.token));
          setStorageToken(request.data.token);

          history.push('/shops');
      }
  }, [request]);

  const handleSubmit = () => {
      if (!email || !password) {
          makeMissingSnackbarOpen(true);
      } else {
          makeRequest();
      }
  };

    const handleCloseMissingSnackbar = () => {
        makeMissingSnackbarOpen(false);
    };
    const handleCloseErrorSnackbar = () => {
        makeErrorSnackbarOpen(false);
    };

  return (
    <Container maxWidth="sm" component="main">
      <Box
        padding={8}
        display="grid"
        style={{ gridTemplateColumns: "1fr", gridGap: 8 }}
      >
        <Typography variant="h2">Zaloguj się</Typography>
        <TextField
            type="email"
            placeholder="twój email"
            onChange={ (e) => makeEmail(e.target.value) }
        />
        <TextField
            type="password"
            placeholder="twoje hasło"
            onChange={ (e) => makePassword(e.target.value) }
        />
        <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={ handleSubmit }
        >
          Zaloguj
        </Button>
      </Box>
      <AutoRotatingCarousel
        label="Zaczynajmy!"
        open={open}
        onClose={() => setOpen(false)}
        onStart={() => setOpen(false)}
        style={{ position: "absolute" }}
      >
        <Slide
          media={
            <img
              src={FindProducts}
              alt="osoba przeglądająca laptopa"
              style={{ maxWidth: 400 }}
            />
          }
          style={{
            backgroundColor: theme.palette.primary.dark
          }}
          mediaBackgroundStyle={{
            backgroundColor: theme.palette.primary.main
          }}
          title="Przygotuj listę zakupów przez aplikację"
          subtitle="Nie narażaj zdrowia i nie trać czasu biegając między półkami"
        />
        <Slide
          media={
            <img
              src={CompletePackage}
              alt="rzeczy wrzucane do pudełka"
              style={{ maxWidth: 400 }}
            />
          }
          style={{
            backgroundColor: theme.palette.primary.dark
          }}
          mediaBackgroundStyle={{
            backgroundColor: theme.palette.secondary.main
          }}
          title="Pracownik sklepu przygotuje paczkę"
          subtitle="Wygodna lista w aplikacji zdecydowanie przyśpieszy ten proces"
        />
        <Slide
          media={
            <img
              src={LittleWalk}
              alt="osoba na spacerze"
              style={{ maxWidth: 400 }}
            />
          }
          style={{
            backgroundColor: theme.palette.primary.dark
          }}
          mediaBackgroundStyle={{
            backgroundColor: theme.palette.primary.main
          }}
          title="Odbierz gdy paczka będzie gotowa"
          subtitle="Krótki spacer i możesz się cieszyć swoimi zakupami"
        />
      </AutoRotatingCarousel>
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
            }}
            open={isMissingSnackbarOpen}
            autoHideDuration={6000}
            onClose={ handleCloseMissingSnackbar }
            message='e-mail lub hasło nie zostało podane'
        />
        <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
            }}
            open={isErrorSnackbarOpen}
            autoHideDuration={6000}
            onClose={ handleCloseErrorSnackbar }
            message='Rejestracja nie udała się'
        />
    </Container>
  );
};

export { LandingScreen };
