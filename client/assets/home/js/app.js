var homeApp = angular.module('homeApp', ['ngRoute']);

homeApp.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'assets/home/partials/home.html'
	})
	.when('/about', {
		templateUrl: 'assets/home/partials/about.html'
	})
	.when('/login', {
		templateUrl: 'assets/home/partials/login.html'
	})
	.when('/signup', {
		templateUrl: 'assets/home/partials/signup.html'
	})
	.otherwise({
		redirectTo: '/'
	});
}]);