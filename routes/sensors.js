var express = require('express');
var router = express.Router();

var pg = require('pg');
var pgConString = "postgres://msvaljek:5432@localhost/msvaljek";

router.get('/', function(req, res) {
	pg.connect(pgConString, function(err, client, done) {
		if(err) {
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
});

module.exports = router;