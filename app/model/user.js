const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
let Schema = mongoose.Schema;
let userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: String,
        lastName: String
    },
    biography: String,
    twitter: String,
    facebook: String,
    linkedin: String,
    profilePicture: Buffer,
    created: { 
        type: Date,
        default: Date.now
    },
    authToken: String
});
/*userSchema.pre('save', (next) => {
	console.log("pre save");
	if(!this.authToken)
		this.authToken = jwt.sign({ id: this._id }, "ewrwrewrewr");
	console.log(this);
	next();
});*/
const User = mongoose.model('User', userSchema);
module.exports = User;