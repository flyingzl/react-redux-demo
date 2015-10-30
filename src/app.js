import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import App from "./containers/RedditApp";
import configStore from "./store/reddit";

import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

let store = configStore();

ReactDOM.render(
	<div>
		<Provider store={store}>
			<App />
		</Provider>
		<DebugPanel top right bottom>
	  		<DevTools store={store}
	    		monitor={LogMonitor}
	        	visibleOnLoad={true} />
		</DebugPanel>
	</div>,
	document.getElementById('root') 
);

