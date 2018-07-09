const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const mongoose = require('mongoose');
const Signature = require('./app/model/signature.js')
const db = require('./config/db.js');
const port = 4000;
app.set('views', __dirname + "/app/views/");
app.use(bodyParser.urlencoded({ extended: true }));
/*MongoClient.connect(db.URL, (err, database) => {
	if(err) return console.log("Error in connecting ", err);
	var db1 = database.db('nodepractice');
	require('./app/notes/index.js')(app, db1);
	require('./app/signature/routes.js')(app, db1);
	app.listen(port, () => {
		console.log("port:::"+ port);
	})	
})*/
mongoose.connect(db.URL, (err, database) => {
	if(err) {
		return console.log("Error in connecting ", err);
	} else {
		let port = process.env.PORT || 5000;
		app.listen(port, () => {
		    console.log("port:::"+ port);
	    })
		console.log("Database connected successfully.");
	}
	//var db1 = database.db('nodepractice');
	require('./app/notes/index.js')(app);
	require('./app/signature/routes.js')(app);
		
})
