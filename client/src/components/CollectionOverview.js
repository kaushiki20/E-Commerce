import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCollectionForPreview } from "../redux/ShopSelectors";
import CollectionPreview from "./CollectionPreview";
import "./CollectionOverview.scss";
const CollectionOverview = ({ collections }) => (
  <div className="collections-overview">
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </div>
);
const mapStatToProps = createStructuredSelector({
  collections: selectCollectionForPreview,
});

export default connect(mapStatToProps)(CollectionOverview);
