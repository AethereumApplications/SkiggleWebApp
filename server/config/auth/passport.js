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
            User.findOne({'email': email}, function(err, user){
                if(err){
                    return done(err);
                }else if(user){
                    return done(null, false, req.flash('signUpMessage', 'Email address already taken.'));
                }else{
                    var newUser = new User();
                    newUser.email = email;
                    newUser.password = newUser.passwordHashGen(password);
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

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        userModel.findById(id, function(err, user) {
            done(err, user);
        });
    });

};