import React from "react";
import CollectionOverview from "../components/CollectionOverview";
import CheckOut from "../pages/CheckOut";
import { Route } from "react-router-dom";
import Collection from "./Collection";
const Shop = ({ match }) => {
  return (
    <div className="shop-page">
      <Route exact path={`${match.path}`} component={CollectionOverview} />
      <Route path={`${match.path}/:collectionId`} component={Collection} />
    </div>
  );
};

export default Shop;
