var express = require('express');
var path = require('path');

module.exports = function(app, passport){

	// static library files - unrestricted access
	app.use('/lib', express.static(path.join(__dirname + '/../../client/lib')));

	// common assets between angular apps - unrestricted access
	app.use('/common', express.static(path.join(__dirname + '/../../client/common')));

	// static files for home - unrestricted access
	app.get('/', isNotLoggedIn, express.static(path.join(__dirname + '/../../client/home')));

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/dashboard',
		failureRedirect: '/',
		failureFlash: true
	}));

	app.post('/login', function(req, res){
		res.send('post to login');
	});

	app.get('/dashboard', function(){
		res.send('get to dashboard');
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

function isNotLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		res.send('redirect to dashboard');
	}else{
		return next();
	}
};