var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
	email : String,
	password : String,
	title : String,
	firstName : String,
	surname : String,
	gender : String,
	DOB : Date,
	telephoneNo : String,
	mobileNo : String,
	postcode : String
});

userSchema.methods.passwordHashGen = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.checkValidPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);