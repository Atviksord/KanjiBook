// App

define([],function(){

	// Private
	var privateVariable = "henry is ";

	// Public
	var api = {}

	api.tellSecret = function(){
		console.log(privateVariable);
	}

	return api;

})