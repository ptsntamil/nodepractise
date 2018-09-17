var User = require('./../model/user.js')
var jwt = require('jsonwebtoken');
var verify = require('./../auth/verifyToken.js')
var _ = require('underscore');
module.exports = function(app, db) {
	app.post('/api/user', function(req, res) {
		let user = new User({
			name:{
				firstName: req.body.firstName,
				lastName: req.body.lastName
			},
			authToken: jwt.sign({ id: this._id }, "ewrwrewrewr")
		});
		user.save((err, result)=> {
			res.send(result);
		})
	});
	app.get('/api/users', verify,function(req, res) {
		User.find({}, function(err, result) {
			res.send(result);
		})
	});
	app.get('/api/user/:id', verify,function(req, res) {
		User.find({_id:req.params.id}, function(err, result) {
			res.send(result);
		})
	});
	app.put('/api/user/:id', verify, function(req, res) {
		console.log(req.body);
		if(_.isEmpty(req.body)) {
			return res.status(400).send({success: false, message: "Body should not be empty"});	
		}
		User.findById(req.params.id, function(err, user) {
			if(user) {
				_.each(req.body, (list, iteratee)=> {
					user[iteratee] = list;
				});
				user.save((err, updated)=>{
					res.send(updated);
				})
			}
		})
	})
}