(function () {
	"use strict";

	var app = angular.module("app");

	var HomeController = function (quoteService) {
		
		var vm = this;

		vm.message = "HomeController";
	
		quoteService.query().then(function (data) {
			vm.quotes = data;
		});
	};

	app.controller("HomeController", ["quoteService", HomeController]);

}());
