import React, { PropTypes, Component } from 'react';

var Posts = (props)=>{
  var styles={
    "textDecoration": "none"
  };
  return (
      <ul>
        {props.posts.map((post, index) =>
          <li key={index}>
          	<a  style={styles} target="_blank" href={post.url}>{post.title}</a>
          </li>
        )}
      </ul>
    ); 
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
};

export default Posts