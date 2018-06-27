var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {
	app.post('/note', function(req,res) {
		db.collection('notes').insert({
			text: req.body.text,
			title: req.body.title
		}, (err, response) => {
			console.log(response);
			if(err) {
				res.send({
			        "message": "Error in adding note.",
			        "success": false
		        });	
			} else {
				res.send(response.ops[0]);
			}
			
		})
	});
	app.get('/note/:id', (req, res) => {
		console.log(req.params);
        db.collection('notes').findOne({
        	"_id": new ObjectID(req.params.id)
        }, (err, response) => {
        	if(err) {
        		res.send({
        			"message": "Error in getting note.",
			        "success": false
        		});
        	} else {
        		res.send(response);
        	}
        });
	});
	app.delete('/note/:id', (req, res) => {
		db.collection('notes').remove({
			_id: new ObjectID(req.params.id)
		}, (err, response) => {
            if(err) {
        		res.send({
        			"message": "Error in deleting note.",
			        "success": false
        		});
        	} else {
        		res.send({
        			"message": "Note deleted successfully",
			        "success": true
        		});
        	}
		});
	});

	app.put('/note/:id', (req, res) => {
        db.collection('notes').update({
        	_id: new ObjectID(req.params.id)
        }, {
        	title: req.body.title,
        	text: req.body.text
        }, (err, response) => {
        	if(err) {
        		res.send({
        			"message": "Error in updating note.",
			        "success": false
        		});
        	} else {
        		res.send(response);
        	}
        })
	});
};