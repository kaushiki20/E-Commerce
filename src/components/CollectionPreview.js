import React from "react";
import "./CollectionPreview.scss";
import CollectionItem from "./CollectionItem";
const CollectionPreview = ({ title, items }) => (
  <div className="collection-preview">
    <h1 className="title">{title.toUpperCase()}</h1>
    <div className="preview">
      {items
        .filter((item, idx) => {
          return idx < 4;
        })
        .map(({ id, ...otherItemProps }) => (
          <CollectionItem id={id} {...otherItemProps} />
        ))}
    </div>
  </div>
);
export default CollectionPreview;
