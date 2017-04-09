const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// TODO: extract middlewares somewhere?
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
require('./controllers')(app);

app.listen(3000, function() {
	/* eslint-disable no-console */
	console.log('Listening on port 3000...');
	/* eslint-enable no-console */
});
