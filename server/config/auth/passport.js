var path = require('path');
var LocalStrategy = require('passport-local').Strategy;
var User = require(path.join(__dirname + '/../models/user'));

module.exports = function(passport) {

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'txtEmail',
        passwordField : 'txtPassword',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        process.nextTick(function() {
            User.findOne({"email": email}, function(err, user){
                if(err){
                    return done(err);
                }else if(user){
                    return done(null, false);
                }else{
                    var newUser = new User();
                    newUser.email = email;
                    newUser.password = newUser.passwordHashGen(password);
                    newUser.title = req.body.selTitle;
                    newUser.firstName = req.body.txtFirstName;
                    newUser.surname = req.body.txtSurname;
                    newUser.DOB = new Date(req.body.txtMonth + req.body.txtDay + req.body.txtYear);
                    newUser.telephoneNo = req.body.txtTelephoneNo;
                    newUser.mobileNo = req.body.txtMobileNo;
                    newUser.postcode = req.body.txtPostcode;
                    newUser.save(function(err){
                        if(err){
                            throw err;
                        }
                        return done(null, newUser);
                    });
                }
            });
        });
    }));

    passport.use('local-login', new LocalStrategy({
        usernameField : 'txtEmail',
        passwordField : 'txtPassword',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        process.nextTick(function() {
            User.findOne({"email": email}, function(err, user){
                if(err){
                    return done(err);
                }else if(!user){
                    return done(null, false);
                }else if(!user.checkValidPassword(password)){
                   return done(null, false);
                }else{
                    return done(null, user);
                }
            });
        });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

};