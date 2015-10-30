import App from "../components/reddit/App";
import React from "react";
import {bindActionCreators} from "redux";

import {connect} from "react-redux";
import * as RdditActions from "../actions/reddit";


var mapStateToProps = (state) => {
  const { selectedReddit, postsByReddit } = state;
  const {
    isFetching,
    lastUpdated,
    items
  } = postsByReddit[selectedReddit] || {
    isFetching: true,
    items: []
  };

  return {
    selectedReddit,
    items,
    isFetching,
    lastUpdated
  };
}


var mapDispatchToProps = dispatch =>{
	return bindActionCreators(RdditActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
