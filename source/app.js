'use strict';

const express = require('express');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'server', 'views'));
app.set('view engine', 'pug');

// TODO: extract middlewares somewhere?
app.use(express.static(__dirname + '/public'));
require(path.join(__dirname, 'server', 'controllers'))(app);

app.listen(3000, function() {
	/* eslint-disable no-console */
	console.log('Listening on port 3000...');
	/* eslint-enable no-console */
});
