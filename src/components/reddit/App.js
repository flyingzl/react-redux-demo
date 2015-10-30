import Picker from "./Picker";
import Posts from "./Posts";
import React from "react";

module.hot.accept();

var App = React.createClass({

	componentDidMount() {
		let{ fetchPostsIfNeeded, selectedReddit} = this.props;
		fetchPostsIfNeeded(selectedReddit);
	},

	componentWillReceiveProps(nextProps) {
		if (nextProps.selectedReddit !== this.props.selectedReddit) {
			let { fetchPostsIfNeeded, selectedReddit} = nextProps
     		fetchPostsIfNeeded(selectedReddit);
   		 }
	},

	handleChange( nextReddit ){
		let {selectReddit, fetchPostsIfNeeded} = this.props;
		selectReddit(nextReddit);

	},

	handleRefreshClick(evt){
		evt.preventDefault();
		let {fetchPostsIfNeeded, invalidteReddit, selectedReddit} = this.props;
		invalidteReddit( selectedReddit);
		fetchPostsIfNeeded(selectedReddit);

	},


	render(){
		const { selectedReddit, items, isFetching, lastUpdated } = this.props;
		var posts = items;
		return (
			<div>
				<Picker value={selectedReddit}
					onChange={this.handleChange}
					options={["reactjs", "angular", "java"]} />
				<p>
		        
		        { lastUpdated &&
		            <span>
		              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
		              {' '}
		            </span>
		        }
		        
		        {!isFetching &&
		            <a href='#'
		               onClick={this.handleRefreshClick}>
		              Refresh
		            </a>
		        }
		        </p>

		        {isFetching && posts.length === 0 &&
		          <h2>Loading...</h2>
		        }

		        {!isFetching && posts.length === 0 &&
		          <h2>Empty.</h2>
		        }

		        { posts.length > 0 &&
		          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
		            <Posts posts={posts} />
		          </div>
		        }
			</div>
		);
	}

});

export default App;