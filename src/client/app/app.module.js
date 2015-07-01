(function () {
	"use strict";
	
	var app = angular.module("app", ["ngResource", "ngRoute", "app.common"]);

	app.config(function ($routeProvider) {
		$routeProvider.when("/home", {
			templateUrl: "/app/home/home.html",
			controller: "HomeController as vm"
		})
		.when("/about", {

		})
		.otherwise({ redirectTo: "/home" });
	});

}());
