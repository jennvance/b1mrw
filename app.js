var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Routes
var loginController = require('./controllers/login.controller')
var projectController = require('./controllers/project.controller')
var countController = require('./controllers/count.controller')
var statsController = require('./controllers/stats.controller')

app.get('/', function(req, res){
  res.sendFile('/html/index.html', {root : './public'})
});

app.post('/addproject', projectController.submitProject)
app.get('/getproject', projectController.selectProject)
app.post('/submituser', loginController.submitLogin)
app.post('/submitcount', countController.submitCount)



//Specify Port for Server
var port = process.env.PORT || 3000
app.listen(port, function(){
  console.log('Server running on port ' + port);

});