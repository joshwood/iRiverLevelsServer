var express = require('express');
var app = express();

app.use(express.bodyParser());

/*
 * controller setup, do this prior to routes
 */
require('./app/controllers/iRiverController');

/*
 * express routes, must have controller config first
 */
require('./app/routes/routes')(app);

/*
 * express static files location
 */
app.use(express.static(__dirname + '/public'));

/*
 * express listen:3030
 */
app.listen(3030);

exports = module.exports = app;
