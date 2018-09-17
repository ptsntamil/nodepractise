var jwt = require('jsonwebtoken');
//var config = require('../config');
let User = require('./../model/user.js')
function verifyToken(req, res, next) {
  var token = req.headers['authorization'];
  //console.log("token ", req.headers)
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  User.find({authToken: token}, (err, result) => {
    if(err) {
      return res.status(500).send({auth: false, message: "Authentication failed: Invalid Token"})
    }
   //console.log(result);
    next();
  })
}
module.exports = verifyToken;