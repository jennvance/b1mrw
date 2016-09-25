angular.module('app', []);

angular.module('app')
	.controller('wordCountroller', ['$scope', '$http', function($scope, $http){
		var s = $scope;
		s.test = "Hi Jenn";
		//not necessary, but semantically useful
		s.submittedUser = {};
		s.currentUser = {};
		s.users=[];
		s.justentered = true;
		s.hasproject=false;
		s.today = new Date();
		s.project = {};
		s.count = {};
		s.projectList = [];
		s.allCounts = [];

		s.User = function(user){
			this.name = user.name;
		}

		s.Project = function(project, user){
			//this._id = #randomnumber;
			this.ownerId = user.name;
			this.name = project.name;
			this.wordGoal = project.wordGoal;
			this.date = project.date;
		}

		s.Count =function(count, project){
			this.owner = project.ownerId;
			//this.projectId = project._id;
			this.date = count.date;
			this.wordCount = count.wordCount;
		}

		s.submitProject = function(){
			s.hasproject = true;
			s.currentProject = new s.Project(s.project, s.currentUser);
			console.log(s.currentProject)
			s.projectList.push(s.currentProject)
			console.log(s.projectList)
			s.project = {};
		}

		s.submitCount = function(){
			s.count = new s.Count(s.count, s.currentProject);
			s.allCounts.push(s.count);
			console.log(s.allCounts)
			s.count = {};
		}



		

		

		s.submitLogin = function(){

			//if users is empty, add new user
			if(s.users==false){
				console.log("users is empty; creating first item")
				s.currentUser = new s.User(s.user);
				s.users.push(s.currentUser)
				s.user = {};
				s.justentered = false;
			} else {
				//search users for name that matches
				for(var i=0;i<s.users.length; i++){
					//if you find a match
					if(s.users[i].name === s.user.name){
						console.log("user exists, displaying data")
						//display data and return out of the for loop
						console.log(i + " name: " + s.user.name)
						s.currentUser = s.user;
						s.user = {};
						console.log("currentUser: " + s.currentUser)
						s.justentered = false;
						return false;
					}
				}
				//if get to end of loop and no match, add new user
				console.log("user doesn't exist, adding user to populated array")
				s.currentUser = new s.User(s.user);
				console.log(s.currentUser.name)
				s.users.push(s.currentUser)
				
				s.user = {};
				s.justentered = false;
			}
		}



	}])