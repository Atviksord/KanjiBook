// Main

//config
require.config({

	baseUrl: "js/app",
	paths: {
		jquery: "../libraries/jquery",
		backbone: "../libraries/backbone",
		mustache: "../libraries/mustache",
		underscore: "../libraries/underscore",
    } 

})

require(["app"],function(app){
	app.tellSecret();
	console.log(app.privateVariable);
})