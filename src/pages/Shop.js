import React, { Component } from "react";
import Shop_Data from "../Data/Shop_Data";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCollections } from "../redux/ShopSelectors";
import CollectionPreview from "../components/CollectionPreview";
const Shop = ({ collections }) => {
  return (
    <div className="shop-page">
      {collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))}
    </div>
  );
};

const mapStatToProps = createStructuredSelector({
  collections: selectCollections,
});
export default connect(mapStatToProps)(Shop);
