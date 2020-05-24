import React from "react";
import WithSpinner from "../components/WithSpinner";
import CollectionOverviewContainer from "../components/CollectionOverviewContainer";

import { connect } from "react-redux";
import { fetchCollectionsStart } from "../redux/ShopAction";
import { Route } from "react-router-dom";
import CollectionContainer from "./CollectionContainer";

class Shop extends React.Component {
  componentDidMount() {
    const { fetchCollectionsStart } = this.props;
    fetchCollectionsStart();
  }

  render() {
    const { match } = this.props;

    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          component={CollectionOverviewContainer}
        />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionContainer}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
});
export default connect(null, mapDispatchToProps)(Shop);
