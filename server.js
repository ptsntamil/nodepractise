const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
const app            = express();
const db = require('./config/db.js');
const port = 4000;
app.use(bodyParser.urlencoded({ extended: true }));
MongoClient.connect(db.URL, (err, database) => {
	if(err) return console.log("Error in connecting ", err);
	var db1 = database.db('nodepractice');
	require('./app/notes/index.js')(app, db1);
	app.listen(port, () => {
		console.log("port:::"+ port);
	})	
})

