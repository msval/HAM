var express = require('express');
var router = express.Router();

var pg = require('pg');
var pgConString = "postgres://msvaljek:5432@localhost/msvaljek";

router.get('/', showAllSensors);

function showAllSensors(req, res) {
	pg.connect(pgConString, function(err, client, done) {
		if (err) {
			return console.error('error fetching client', err);
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

router.post('/add', function (req, res) {
	pg.connect(pgConString, function (err, client, done) {
		if (err) {
			return console.error('error fetching client', err);
		}

		var query = client.query('INSERT INTO sensor(name) VALUES($1)', [req.param('name')]);
		
		return res.redirect('/sensors');
	});
});

router.post('/update', function (req, res) {
	pg.connect(pgConString, function (err, client, done) {
		if (err) {
			return console.error('error fetching client', err);
		}

		var query = client.query('UPDATE sensor SET name = $1 WHERE id = $2',
			[req.param('name'), req.param('id')]);
		
		return res.redirect('/sensors');
	});
});

router.post('/del', function (req, res) {
	pg.connect(pgConString, function (err, client, done) {
		if (err) {
			return console.error('error fetching client', err);
		}

		var query = client.query('DELETE FROM sensor WHERE id = $1', [req.param('id')]);
		
		return res.redirect('/sensors');
	});
});

module.exports = router;