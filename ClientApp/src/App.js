import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { Routes } from "./routes";
import rootReducer from "./redux/reducers";
import { theme } from "./theme";

import { Navbar } from "./components/Navbar";

const store = configureStore({ reducer: rootReducer });

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Navbar />
            <Routes />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </div>
  );
};

export default App;
