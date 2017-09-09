'use strict';

const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const configuration = require('./server/configuration');

app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));
require(path.join(__dirname, 'server', 'data'))(configuration.dbString);
require(path.join(__dirname, 'server', 'middlewares'))(app);
require(path.join(__dirname, 'server', 'controllers'))(app);
require(path.join(__dirname, 'server', 'services', 'executor', 'bootstrap'));

app.listen(port, function() {
	/* eslint-disable no-console */
	console.log(`Listening on port ${port}...`);
	/* eslint-enable no-console */
});
