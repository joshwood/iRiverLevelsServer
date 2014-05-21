var express = require('express');
var app = express();

/*
 * if you're unlucky enough to be behind a firewall, set HTTP_PROXY in 
 * your environment before starting node server
 */
var proxy = process.env.HTTP_PROXY || null;

/*
 * required for json post - which we're not currently using.
 * this MUST be located here before router middleware - ugh, that was 2 hours of wasted time
 * http://stackoverflow.com/questions/20381059/cant-get-post-body-from-request-using-express-js
 */
app.use(express.bodyParser());

/*
 * controller setup, do this prior to routes
 */
require('./app/controllers/iRiverController').init(proxy);

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
