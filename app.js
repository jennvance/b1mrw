var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Routes
//...

app.get('/', function(req, res){
  res.sendFile('/html/index.html', {root : './public'})
});



//Specify Port for Server
var port = process.env.PORT || 3000
app.listen(port, function(){
  console.log('Server running on port ' + port);

});