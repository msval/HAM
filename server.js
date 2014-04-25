var app = require('./app.js');

var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});