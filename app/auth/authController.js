var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../model/user.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../../config/db.js');