import React from "react";
import { Switch, Route } from "react-router-dom";

import { CartScreen } from "./screens/Cart";
import { OrdersListScreen } from "./screens/OrdersList";
import { ShopScreen } from "./screens/Shop";
import { ShopsListScreen } from "./screens/ShopsList";

export const Routes = () => (
  <Switch>
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
  </Switch>
);

export default Routes;
