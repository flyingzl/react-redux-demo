import {
    combineReducers
}
from "redux";
import {
    REQUEST_POSTS,
    RECEIVE_POSTS,
    SELECT_REDDIT,
    INVALIDATE_REDDIT
}
from "../constants/reddit";

// state结构
// {
//  postsByReddit:{
//      "reactjs": {
//          "posts": [],
//          isFetching: false,
//          didInvalidate:false,
//          lastUpdated: 111111,
//          receiveAt: 1111111
//      }
//  }
// }

var initialPosts = {
    isFetching: false,
    didInvalidate: false,
    items: []
};

var selectedReddit = (state = 'reactjs', action) => {
    return action.type == SELECT_REDDIT ? action.reddit : state;
}

var posts = (state = initialPosts, action) => {
    switch (action.type) {
        case INVALIDATE_REDDIT:
            return Object.assign({}, state, {
                didInvalidate: true
            });
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case RECEIVE_POSTS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.response,
                lastUpdated: action.receiveAt
            });
        default:
            return state;
    }
}

var postsByReddit = (state = {}, action) => {
    switch (action.type) {
        case INVALIDATE_REDDIT:
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
            return Object.assign({}, state, {
                [action.reddit]: posts(state[action.reddit], action)
            });
        default:
            return state;
    }
}



export default combineReducers({
    selectedReddit,
    postsByReddit
})
