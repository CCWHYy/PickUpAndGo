import React from 'react';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";

import { Routes } from "./routes";
import rootReducer from './redux/reducers';

const store = configureStore({ reducer: rootReducer });

const App = () => (
    <div>
        <Provider store={ store }>
            <BrowserRouter>
                <Routes />
            </BrowserRouter>
        </Provider>
    </div>
);

export default App;
