var express = require('express');
var app = express();
app.use(express.static('.'));
app.listen(5678, function () {
	console.log('listening on 5678');
});