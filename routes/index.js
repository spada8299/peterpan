var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var test = req.db.get('test');
  test.insert({foo: 'bar'});
  res.render('index', { title: 'Express' });
});

module.exports = router;
