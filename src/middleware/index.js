
var CallApiMiddleware = ({dispatch, getState}) => next => action => {
	let {types, shouldCallAPI, callApi, payload } = action;
	if( !types){
		return next(action);
	}
	
	if( typeof callApi !== 'function' ){
		throw new Error("expect allApi to be a function");
	}

	if( !shouldCallAPI(getState())){
		return;
	}

	let [requestType, successType, failureType= "RESPONSE_FAILURE" ] = types;
	dispatch(Object.assign({}, payload, {
		type: requestType
	}));

	return callApi().then(
		response => dispatch(Object.assign({}, payload, {
			response,
			type: successType
		})),

		error => dispatch(Object.assign({}, payload, {
			error,
			type: failureType
		}))
	);
}


export {CallApiMiddleware};