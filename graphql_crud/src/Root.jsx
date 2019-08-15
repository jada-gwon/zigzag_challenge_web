import React from 'react';
import { Switch, Route } from 'react-router';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import CreateProduct from './CreateProduct';

const Root = () => (
  <Switch>
    <Route exact path="/" component={ProductList} />
    <Route path="/create" component={CreateProduct} />
    <Route path="/product/:productId" component={ProductDetail} />
  </Switch>
);

export default Root;
