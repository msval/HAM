var pg = require('pg');
var pgConString = "postgres://msvaljek:5432@localhost/msvaljek";

pg.connect(pgConString, function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }
  client.query('SELECT *  FROM sensor', [], function(err, result) {
    done();

    if(err) {
      return console.error('error running query', err);
    }

    for (var i = 0; i < result.rows.length; i++) {
      console.log(result.rows[i].name);
    }
  });
});