import React from "react";
import WithSpinner from "../components/WithSpinner";
import CollectionOverview from "../components/CollectionOverview";
import {
  firestore,
  convertCollectionsSnapshotToMap,
} from "../firebase/FireBaseUtils";

import { connect } from "react-redux";
import { updateCollections } from "../redux/ShopAction";
import { Route } from "react-router-dom";
import Collection from "./Collection";

const CollectionOverviewSpinner = WithSpinner(CollectionOverview);
const CollectionSpinner = WithSpinner(Collection);
class Shop extends React.Component {
  state = {
    loading: true,
  };

  unSubscribeFromSnapshot = null;
  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");
    this.unSubscribeFromSnapshot = collectionRef.onSnapshot(
      async (snapshot) => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
        updateCollections(collectionsMap);
        this.setState({ loading: false });
      }
    );
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionOverviewSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});
export default connect(null, mapDispatchToProps)(Shop);
