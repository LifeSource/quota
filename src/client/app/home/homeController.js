(function () {
    "use strict";

    angular
        .module("app")
        .controller("HomeController", ["quoteService", "randomGeneratorService", "$interval", HomeController]);

    function HomeController(quoteService, randomGeneratorService, $interval) {

        var vm = this;

        vm.countDown = 10;

        quoteService.query().then(function (data) {
            vm.quotes = data;
            generateRandomQuote();
        });

        startCountDown();

        function decrementCountDown() {
            vm.countDown -= 1;
            if (vm.countDown < 1) {
                generateRandomQuote();
                vm.countDown = 10;
            }
        }

        function startCountDown() {
            $interval(decrementCountDown, 1000);
        }

        function generateRandomQuote() {
            var randomNumber = randomGeneratorService.generateRandomNumber(0, vm.quotes.length);
            vm.randomQuote = vm.quotes[randomNumber];
        }
    }
}());