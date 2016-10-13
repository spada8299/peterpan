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
	if (allNum.length != 0) {
		list.insert(allNum, {}, function(e, d) {
			if (e != null) {
				console.log(e);
				res.json({data: '0'});
			} else {
				console.log(d);
				res.json({data: '1'});
			}
		});
	} else {
		res.json({data: '2'});
	}
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

router.post('/numCheck', function(req, res, next) {
	var db = req.db;
	var check = req.body.numCheck;
	var list = db.get('numList');
	list.find({num: check}, {}, function(e, d) {
		if (e != null) {
			console.log(e);
			res.json({data: '0'});
		} else if (d.length === 0) {
			console.log(d);
			res.json({data: '2'});
		} else if (d[0].content != undefined) {
			console.log(d);
			res.json({data: '3'});
		} else {
			console.log(d);
			res.json({data: '1'});
		}
	});
});

router.post('/wish', function(req, res, next) {
	var db = req.db;
	var pack = req.body;
	var list = db.get('numList');
	console.log(req.body);
	list.find({num: pack.num}, {}, function(e, d) {
		if (e != null) {
			console.log(e);
			res.json({data: '0'});
		} else if (d.length === 0) {
			console.log(d);
			res.json({data: '2'});
		} else if (d[0].content != undefined) {
			console.log(d);
			res.json({data: '3'});
		} else {
			console.log(d);
			list.update({num: pack.num}, pack, {}, function(er, da) {
				if (er != null) {
					console.log(er);
					res.json({data: '0'});
				} else {
					console.log(da);
					res.json({data: '1'});
				}
			});
		}
	});
});

router.get('/wish', function(req, res, next) {
	var db = req.db;
	var list = db.get('numList');
	list.find({ content: { $exists: true } }, { 'sort': { $natural : -1 }, 'limit': 7 }, function(e, d) {
		if (e != null) {
			console.log(e);
			res.json({data: '0'});
		} else {
			console.log(d);
			res.json({data: '1', content: d});
		}
	});
});

router.get('/wish/:num', function(req, res, next) {
	var db = req.db;
	var list = db.get('numList');
	list.find({ num: req.params.num }, {}, function(e, d) {
		if (e != null) {
			console.log(e);
			res.json({data: '0'});
		} else {
			console.log(d);
			res.json({data: '1', content: d});
		}
	});
});

module.exports = router;
