var express = require('express');
var app = express();

app.use(express.static(__dirname + '/static'));
app.post('/post', function(req, res) {
	console.log('GA was invoked...');
	// res.setHeader('content-type', 'text/javascript');
	res.send('OK');
});

app.listen(9999);