(function () {
	"use strict";

	var module = angular.module("app.common");

	var quoteService = function ($http) {
		
		var api = "/api/quotes";

		var query = function () {
			return $http.get(api).then(function (response) {
				return response.data;
			});
		};

		var get = function (id) {
			
		};


		return {
			query: query,
			get: get
		};
	};

	module.factory("quoteService", ["$http", quoteService]);
}());
