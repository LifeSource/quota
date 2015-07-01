(function () {

    "use strict";

    angular
        .module("app.common")
        .factory("randomGeneratorService", [randomGeneratorService]);

    function randomGeneratorService() {

        function generateRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        }

        return {
            generateRandomNumber: generateRandomNumber
        };
    }

}());