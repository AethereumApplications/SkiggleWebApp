var homeApp = angular.module('homeApp', ['ngRoute']);

homeApp.config(['$routeProvider', function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'assets/home/partials/home.html',
		title: 'Home | Skiggle'
	})
	.when('/about', {
		templateUrl: 'assets/home/partials/about.html',
		title: 'About Us | Skiggle'
	})
	.when('/login', {
		templateUrl: 'assets/home/partials/login.html',
		title: 'Log In | Skiggle'
	})
	.when('/signup', {
		templateUrl: 'assets/home/partials/signup.html',
		title: 'Sign Up | Skiggle'
	})
	.otherwise({
		redirectTo: '/'
	});
}]);

homeApp.run(['$route', '$rootScope', function($route, $rootScope){
	$rootScope.$on('$routeChangeSuccess', function(){
		document.title = $route.current.title;
	});
}]);