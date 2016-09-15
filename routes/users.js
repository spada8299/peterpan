var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var list = db.get('numList');
  list.find({}, {}, function(e, d) {
  	if (e != null) {
  		res.json({data: "0"});
  	} else {
  		res.json({data: "1", content: d});
  	}
  });
});

router.post('/', function(req, res, next) {
	var db = req.db;
	var allNum = req.body.allNum;
	var list = db.get('numList');

	list.insert(allNum, {}, function(e, d) {
		if (e != null) {
			console.log(e);
			res.json({data: '0'});
		} else {
			console.log(d);
			res.json({data: '1'});
		}
	});
});

router.put('/:id', function(req, res, next) {
	var db = req.db;
	var updateNum = req.body;
	var list = db.get('numList');
	console.log(req.body);
	console.log(req.params.id);
	list.update({_id: req.params.id}, updateNum, {}, function(e, d) {
		if (e != null) {
			console.log(e);
			res.json({data: '0'});
		} else {
			console.log(d);
			res.json({data: '1'});
		}
	});
});

router.delete('/:id', function(req, res ,next) {
	var db = req.db;
	var deleteId = req.params.id;
	var list = db.get('numList');
	console.log(deleteId);
	list.remove({_id: deleteId}, {}, function(e, d) {
		if (e != null) {
			console.log(e);
			res.json({data: '0'});
		} else {
			console.log(d);
			res.json({data: '1'});
		}
	});
});

module.exports = router;
