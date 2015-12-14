
var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.post('/adduser', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.insert(req.body, function(err, result){
        res.send(
        	(err === null) ? {msg: ''} : {msg: err}
        );
    });
});

/*
 * DELETE to deleteuser
*/

router.delete('/deleteuser/:id', function(req,res){
	var db = req.db;
	var collection = db.get('userlist');
	var userToDelete = req.params.id;
	collection.remove({'_id': userToDelete}, function(err){
		res.send((err === null) ? {msg: ''} : {msg:'error: ' + err});
	});
});

router.get('/:id', function(req,res){
	var db = req.db;
	var collection = db.get('userlist');
	var userToGet = req.params.id;
	collection.find({'_id': userToGet}, function(e, docs){
		res.json(docs);
	});
});

router.put('/edituser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userId = req.params.id;
    collection.update({'_id': userId}, req.body, function(err, result){
        res.send(
        	(err === null) ? {msg: ''} : {msg: err}
        );
    });
});

module.exports = router;