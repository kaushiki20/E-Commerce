import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

export const selectCollections = createSelector(
  [selectShop],
  (shop) => shop.collections
);

export const selectCollectionForPreview = createSelector(
  [selectCollections],
  (collections) => Object.keys(collections).map((keys) => collections[keys])
);

// export const selectCollection = (collectionUrlParam) =>
//   createSelector([selectCollections], (collection) =>
//     collection.find(collection.id === COLLECTION_ID_MAP[collectionUrlParam.id])
//   );
export const selectCollection = (collectionUrlParam) =>
  createSelector(
    [selectCollections],
    (collections) => collections[collectionUrlParam]
  );
