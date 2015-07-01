(function () {
    "use strict";

    angular
        .module("app.common")
        .factory("quoteService", ["$http", quoteService]);

    function quoteService($http) {

        var api = "/api/quotes";

        var query = function () {
            return $http.get(api).then(function (response) {
                return response.data;
            });
        };

        return {
            query: query
        };
    }

}());