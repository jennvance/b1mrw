var User = function(user){
	this.name = user.name;
	this.dateSignedUp = new Date();
}

var Project = function(project, user){
	this._id = project._id;
	this.ownerId = user.name;
	this.name = project.name;
	this.startDate = new Date();
	this.wordGoal = project.wordGoal;
	this.endDate = project.date;
}

var Count = function(count, project){
	this.owner = project.ownerId;
	this.projectId = project._id;
	this.date = count.date;
	this.wordCount = count.wordCount;
}

module.exports = {
	user: user,
	project: project,
	count: count
}
