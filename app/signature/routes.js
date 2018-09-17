//var ObjectID = require('mongodb').ObjectID;
const Signature = require('./../model/signature.js')
module.exports = function(app, db) {
	app.get('/', function(req, res) {
	  res.json('you did it');
	});
	//==========================//
	//====GET ALL SIGNATURES===//
	app.get('/api/signatures', function(req, res) {
	  Signature.find({}, (err, eachOne) => {
	    res.send(eachOne);
	    })
	  })
	//==========================//
	//====POST NEW SIGNATURE===//
	app.post('/api/signatures', function(req, res) {
		console.log("asdsadsdasd",req);
		let signature = new Signature({
			guestSignature: req.body.guestSignature,
	    	message: req.body.message,
	    	createdTime: new Date()
		});
		console.log("method::::" ,signature);
		signature.save(function(err, result) {
			res.send(result);
		})
		
	  /*Signature.create({
	    guestSignature: req.body.SignatureOfGuest,
	    message: req.body.MessageofGuest,
	  }).then(signature => {
	    res.json(signature)
	  });*/
	});
}