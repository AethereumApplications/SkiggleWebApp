var homeApp = angular.module('homeApp', ['ngRoute']);

homeApp.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'partials/home.html'
	})
	.when('/about', {
		templateUrl: 'partials/about.html'
	})
	.when('/login', {
		templateUrl: 'partials/login.html'
	})
	.when('/signup', {
		templateUrl: 'partials/signup.html'
		controller: 'signUpController'
	})
	.otherwise({
		redirectTo: '/'
	});
}]);