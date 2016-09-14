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

module.exports = router;
