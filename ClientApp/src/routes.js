import React from "react";
import { Switch, Route } from "react-router-dom";

import { LandingScreen } from "./screens/Landing";
import { RegisterScreen } from "./screens/Register";
import { CartScreen } from "./screens/Cart";
import { OrdersListScreen } from "./screens/OrdersList";
import { ShopScreen } from "./screens/Shop";
import { ShopsListScreen } from "./screens/ShopsList";
import { AdminStoreProductsScreen } from "./screens/AdminStoreProducts";
import { AdminStoreOrdersScreen } from "./screens/AdminStoreOrders";

export const Routes = () => (
  <Switch>
    <Route path="/" exact>
      <LandingScreen />
    </Route>
    <Route path="/register" exact>
      <RegisterScreen />
    </Route>
    <Route path="/cart">
      <CartScreen />
    </Route>
    <Route path="/orders">
      <OrdersListScreen />
    </Route>
    <Route path="/shop">
      <ShopScreen />
    </Route>
    <Route path="/shops">
      <ShopsListScreen />
    </Route>
    <Route path="/admin/store/products">
      <AdminStoreProductsScreen />
    </Route>
    <Route path="/admin/store/orders">
      <AdminStoreOrdersScreen />
    </Route>
  </Switch>
);

export default Routes;
