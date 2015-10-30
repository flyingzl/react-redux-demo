import {
    REQUEST_POSTS,
    RECEIVE_POSTS,
    SELECT_REDDIT,
    INVALIDATE_REDDIT
}
from "../constants/reddit";

// {
//  postsByReddit:{
//    "reactjs": {
//      "items": [],
//      isFetching: false,
//      didInvalidate:false,
//      receiveAt: 1111111
//    }
//  }
// }


export function selectReddit(reddit) {
    return {
        type: SELECT_REDDIT,
        reddit
    }
}

export function invalidteReddit(reddit) {
    return {
        type: INVALIDATE_REDDIT,
        reddit
    }
}

export function requestPosts(reddit) {
    return {
        type: REQUEST_POSTS,
        reddit
    }
}


// var receivePosts = (reddit, json) => {
//     return {
//         type: RECEIVE_POSTS,
//         reddit,
//         posts: json.data.children.map(child => child.data),
//         receiveAt: Date.now()
//     }
// }

// var fetchPosts = reddit => {
//     return dispatch => {
//         dispatch(requestPosts(reddit));
//         fetch(`http://www.reddit.com/r/${reddit}.json`)
//             .then(req => req.json())
//             .then(json => dispatch(receivePosts(reddit, json)));
//     }
// }

var shouldFetchPosts = (state, reddit) => {
    const posts = state.postsByReddit[reddit];
    if (!posts) {
        return true;
    } else if (posts.isFetching) {
        return false;
    } else {
        return posts.didInvalidate;
    }
}

// export function fetchPostsIfNeeded(reddit) {
//     return (dispatch, getState) => {
//         if (shouldFetchPosts(getState(), reddit)) {
//             dispatch(fetchPosts(reddit));
//         }
//     };
// }

export function fetchPostsIfNeeded(reddit){
    return{
        types: [REQUEST_POSTS, RECEIVE_POSTS],
        shouldCallAPI: (state) => shouldFetchPosts(state,reddit),
        callApi: () => {
            return fetch(`http://www.reddit.com/r/${reddit}.json`)
                .then(req => req.json())
                .then(json => json.data.children.map(child => child.data) )
        },
        payload: { reddit, receiveAt: Date.now() }
    }
}
