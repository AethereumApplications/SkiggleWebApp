var express = require('express');
var router = express.Router();
var path = require('path');
var mongoClient = require('mongodb').MongoClient;
var mongoURL = 'mongodb://localhost:27017/skiggleDB';

// Dummy auth code - change when adding sessions
var authorised = true;

var auth = function(req, res, next){
	if(authorised){
		next();
	}else{
		res.redirect('/#/login');
	}
};

router.use(auth);

router.get('/getUsers', function(req, res){
	mongoClient.connect(mongoURL, function(err, db){
		if(err){
			console.error(err);
		}else{
			db.collection('users').find({}, {"_id" : 0, "name" : 1}).toArray(function(err, result){
				if(err){
					console.error(err);
				}else{
					res.status(200).json(result);
				}
				db.close();
			});
		}
	});
});

router.use('/marketplace', express.static(path.join(__dirname + '/../../client/marketplace')));

router.use('/forum', express.static(path.join(__dirname + '/../../client/forum')));

module.exports = router;