var express = require('express');
var path = require('path');

module.exports = function(app, passport){

	// static library files - unrestricted access
	app.use('/lib', express.static(path.join(__dirname + '/../../client/lib')));

	// directory for angular app specific assets and common assets - unrestricted access
	app.use('/assets', express.static(path.join(__dirname + '/../../client/assets')));

	// route for home - unrestricted access
	app.get('/', isNotLoggedIn, function(req, res){
		res.status(200).sendFile(path.join(__dirname + '/../../client/views/home.html'));
	});

	app.get('/dashboard', isLoggedIn, function(req, res){
		res.status(200).sendFile(path.join(__dirname + '/../../client/views/dashboard.html'));
	});

	app.get('/marketplace', isLoggedIn, function(req, res){
		res.status(200).sendFile(path.join(__dirname + '/../../client/views/marketplace.html'));
	});

	app.get('/forum', isLoggedIn, function(req, res){
		res.status(200).sendFile(path.join(__dirname + '/../../client/views/forum.html'));
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/dashboard'
	}));

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/dashboard'
	}));

	app.all('/signout', isLoggedIn, function(req, res){
		req.logout();
		res.status(302).redirect('/');
	});

};

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		return res.status(302).redirect('/#/login');
	}
};

function isNotLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return res.status(302).redirect('/dashboard');
	}else{
		return next();
	}
};