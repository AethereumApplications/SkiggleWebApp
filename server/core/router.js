var express = require('express');
var path = require('path');

module.exports = function(app, passport){

	// static library files - unrestricted access
	app.use('/lib', express.static(path.join(__dirname + '/../../client/lib')));

	// common assets between angular apps - unrestricted access
	app.use('/common', express.static(path.join(__dirname + '/../../client/common')));

	// static files for home - unrestricted access
	app.use('/', express.static(path.join(__dirname + '/../../client/home')));

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/dashboard',
		failureRedirect: '/signup',
		failureFlash: true
	}));

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/dashboard',
		failureRedirect: '/',
		failureFlash: true
	}));

	app.get('/dashboard', isLoggedIn, function(req, res){
		res.status(200).send('get to dashboard');
	});

	app.get('/marketplace', isLoggedIn, function(req, res){
		res.send('get to marketplace');
	});

	app.get('/forum', isLoggedIn, function(req, res){
		res.send('get to forum');
	});

	app.all('/logout', isLoggedIn, function(req, res){
		req.logout();
		res.send('all to logout');
	});

};

function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		return res.send('not authorised');
	}
};

// function isNotLoggedIn(req, res, next){
// 	if(req.isAuthenticated()){
// 		res.send('redirect to dashboard - already auth');
// 	}else{
// 		return next();
// 	}
// };