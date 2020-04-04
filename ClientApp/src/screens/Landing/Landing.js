import React, { useEffect, useState } from "react";
import { Box, Button, Container, Typography } from "@material-ui/core";
import theme from "../../theme";

import TextField from "@material-ui/core/TextField";

import { AutoRotatingCarousel, Slide } from "material-auto-rotating-carousel";

import FindProducts from "../../images/1_find_products.svg";
import CompletePackage from "../../images/2_complete_package.svg";
import LittleWalk from "../../images/3_little_walk.svg";

const LandingScreen = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const SEEN_ONBOARDING = "SEEN_ONBOARDING";
    if (localStorage.getItem(SEEN_ONBOARDING) !== "TRUE") {
      setOpen(true);
      localStorage.setItem(SEEN_ONBOARDING, "TRUE");
    }
  }, []);

  return (
    <Container maxWidth="sm" component="main">
      <Box
        padding={8}
        display="grid"
        style={{ gridTemplateColumns: "1fr", gridGap: 8 }}
      >
        <Typography variant="h2">Zaloguj się</Typography>
        <TextField type="email" placeholder="twój email" />
        <TextField type="password" placeholder="twoje hasło" />
        <Button variant="contained" color="primary" type="submit">
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
    </Container>
  );
};

export { LandingScreen };
