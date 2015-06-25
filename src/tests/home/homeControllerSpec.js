describe("HomeController Spec", function() {

	var scope,
		quoteService,
		$controllerConstructor;

	beforeEach(module("app"));
	beforeEach(module("app.common"));

	beforeEach(inject(function($controller, $rootScope) {
		scope = $rootScope.$new();
		quoteService = sinon.stub({ get: function() {} });
		$controllerConstructor = $controller;
	}));


	it("should have a on scope called message", function() {

		var ctrl = $controllerConstructor("HomeController",
			{ 
				$scope: scope,
				quoteService: quoteService
			});

		expect(scope).toBeDefined();
		expect(ctrl.message).toBeDefined();
		expect(ctrl.message).toEqual("HomeController");


		//expect(ctrl.message).toEqual("HomeController");
	});

});	

