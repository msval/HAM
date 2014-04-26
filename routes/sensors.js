var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {

	res.render('sensors', { title: 'Sensors list' });
});

module.exports = router;