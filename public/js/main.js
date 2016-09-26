angular.module('app', []);

angular.module('app')
	.controller('wordCountroller', ['$scope', '$http', function($scope, $http){
		var s = $scope;
		s.test = "Hi Jenn";
		//hide/show values
		s.showloginform=true;
		s.showprojectform = false;
		s.showcountform=false;
		//initializing empty objects not necessary(?), but semantically useful
		s.submittedUser = {};
		s.currentUser = {};
		s.users=[];
		s.today = new Date();
		s.project = {};
		s.count = {};
		s.count.date = new Date();
		s.projectList = [];
		s.allCounts = [];
		//wordcount stats
		s.allTimeTotal = 0;
		s.currentYearTotal = 0;
		s.currentMonthTotal = 0;

		s.avgWordsPerDayAllTime
		s.avgWordsPerDayYear
		s.avgWordsPerDayMonth

		s.daysUntilGoal
		s.currentGoalWordCount
		s.wordsUntilGoal
		s.wordsPerDaySinceStartingGoal
		s.wordsPerDayToMeetGoal


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

		s.calcAllTimeTotal = function(){
			s.allTimeTotal = 0;
			for(var i=0; i<s.allCounts.length; i++){
				s.allTimeTotal += s.allCounts[i].wordCount;
			}
		}

		s.calcYearTotal = function(whichYear){
			s.currentYearTotal = 0;
			for(var i=0; i<s.allCounts.length; i++){
				var yr = s.allCounts[i].date.getFullYear();
				if(yr === whichYear){
					s.currentYearTotal += s.allCounts[i].wordCount;
				}
				console.log(s.currentYearTotal)
			}
		}


		s.submitProject = function(){
			s.showcountform = true;
			s.currentProject = new s.Project(s.project, s.currentUser);
			console.log(s.currentProject)
			s.projectList.push(s.currentProject)
			console.log(s.projectList)
			s.project = {};
			s.showprojectform = false;
			
		}

		Date.prototype.areDatesSame = function(date) {
		  return (
		    this.getFullYear() === date.getFullYear() &&
		    this.getMonth() === date.getMonth() &&
		    this.getDate() === date.getDate()
		  );
		}

		s.submitCount = function(){
			console.log("date: ", s.count.date)
			if (s.allCounts==false) {
				s.currentCount = new s.Count(s.count, s.currentProject);
				s.allCounts.push(s.currentCount);
				console.log(s.allCounts)
				s.count = {};
				s.count.date = new Date();

			} else {
				for(var i=0; i<s.allCounts.length; i++){
						if(s.allCounts[i].date.areDatesSame(s.count.date)){
							console.log("same")
						} else {
							console.log("diff")
						}
				}
				s.count = new s.Count(s.count, s.currentProject);
				s.allCounts.push(s.count);
				s.count = {};
				s.count.date = new Date();	
			}
			s.calcAllTimeTotal();
			s.calcYearTotal(2016);
		}



		

		

		s.submitLogin = function(){

			//if users is empty, add new user
			if(s.users==false){
				console.log("users is empty; creating first item")
				s.currentUser = new s.User(s.user);
				s.users.push(s.currentUser)
				s.user = {};
				s.showloginform=false;
				s.showprojectform = true;
			} else {
				//search users for name that matches
				for(var i=0; i<s.users.length; i++){
					//if you find a match
					if(s.users[i].name === s.user.name){
						console.log("user exists, displaying data")
						//display data and return out of the for loop
						console.log(i + " name: " + s.user.name)
						s.currentUser = s.user;
						s.user = {};
						console.log("currentUser: " + s.currentUser)
						s.showloginform=false;
						s.showprojectform = true;
						return false;
					}
				}
				//if get to end of loop and no match, add new user
				console.log("user doesn't exist, adding user to populated array")
				s.currentUser = new s.User(s.user);
				console.log(s.currentUser.name)
				s.users.push(s.currentUser)
				
				s.user = {};
				s.showloginform=false;
				s.showprojectform = true;
			}
		}



	}])