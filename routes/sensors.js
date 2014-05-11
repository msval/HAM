var express = require('express');
var router = express.Router();

var pg = require('pg');
var pgConString = "postgres://";

router.get('/', showAllSensors);

router.post('/add', function (req, res) {
	pg.connect(pgConString, function (err, client, done) {
		if (err) {
			return console.error('error fetching client from pool', err);
		}
		console.log('help');
		console.log(req.param('name'));

		var query = client.query('INSERT INTO sensor(name) VALUES($1)', [req.param('name')]);
		
		return res.redirect('/sensors');
	});
});

function showAllSensors(req, res) {
	pg.connect(pgConString, function(err, client, done) {
		if (err) {
			return console.error('error fetching client from pool', err);
		}

		client.query('SELECT *  FROM sensor', [], function(err, result) {
			done();

			if(err) {
				return console.error('error running query', err);
			}

			res.render('sensors', {
				title: 'Sensors list',
				rows: result.rows
			});

		});
    });
}

module.exports = router;