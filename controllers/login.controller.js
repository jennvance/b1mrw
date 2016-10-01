var model = require('../models/all.models.js')

module.exports = {
	submitLogin: function(req, res){
		var user = new model.User(req.body)
	},
	submitProject: function(req, res){
		var project = new model.Project(req.body)
	},
	submitCount: function(req, res){
		var count = new model.Count(req.body)
	}
}

//addProject and addCount will need to be moved to respective controller files