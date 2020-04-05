import React, {useState, useEffect} from "react";
import { useHistory } from 'react-router-dom';

import {Box, Button, Container} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import { useFetch } from "../../hooks/useFetch";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import {isRequestSuccessed} from "../../utils/request";
import {setStorageToken} from "../../utils/localStorage";


export const RegisterScreen = () => {
    const history = useHistory();
    const [email, makeEmail] = useState(null);
    const [password, makePassword] = useState(null);
    const [isMissingSnackbarOpen, makeMissingSnackbarOpen] = useState(false);
    const [isErrorSnackbarOpen, makeErrorSnackbarOpen] = useState(false);
    const [request, makeRequest, clearRequest] = useFetch({
        url: '/api/users',
        options: {
            method: 'POST',
            body: JSON.stringify({ email, password })
        },
    });
    const [loginRequest, makeLoginRequest, clearLoginRequest] = useFetch({
        url: '/api/users/login',
        options: {
            method: 'POST',
            body: JSON.stringify({ email, password })
        },
    });

    const handleRegister = async () => {
    if (!email || !password) {
        makeMissingSnackbarOpen(true);
    } else {
        makeRequest();
    }
  };

  useEffect(() => {
    if (request.error) {
        makeErrorSnackbarOpen(true);
        clearRequest();
    }
    if (isRequestSuccessed(request)) {
        makeLoginRequest();
        clearRequest();
    }
  }, [clearRequest, request]);

  useEffect(() => {
      if (isRequestSuccessed(loginRequest)) {
          setStorageToken(loginRequest.data.token);
          history.push('/shops');
      }
      if (loginRequest.error) {
          history.push('/');
      }
  }, [loginRequest]);

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
              <Typography variant="h2">Zarejestruj się</Typography>
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
                  onClick={ handleRegister }
              >
                  Zarejestruj
              </Button>
          </Box>
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

export default RegisterScreen;
