angular.module('app', []);

angular.module('app')
	.controller('wordCountroller', ['$scope', '$http', function($scope, $http){
		var s = $scope;
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
		//averages stats
		s.avgWordsPerDayAllTime = 0;
		s.avgWordsPerDayYear = 0;
		s.avgWordsPerDayMonth = 0;
		//initializing with no value = undefined; don't use
		s.daysUntilGoal
		s.currentGoalWordCount
		s.wordsUntilGoal
		s.wordsPerDaySinceStartingGoal
		s.wordsPerDayToMeetGoal


		s.User = function(user){
			this.name = user.name;
			this.dateSignedUp = new Date();
		}

		s.Project = function(project, user){
			//this._id = #randomnumber;
			this.ownerId = user.name;
			this.name = project.name;
			this.startDate = new Date();
			this.wordGoal = project.wordGoal;
			this.endDate = project.date;
		}

		s.Count =function(count, project){
			this.owner = project.ownerId;
			//this.projectId = project._id;
			this.date = count.date;
			this.wordCount = count.wordCount;
		}

//Calculation functions
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
			}
		}
		s.calcMonthTotal = function(whichMonth){
			s.currentMonthTotal = 0;
			for (var i=0; i<s.allCounts.length; i++){
				var mo = s.allCounts[i].date.getMonth();
				if(mo === whichMonth){
					s.currentMonthTotal += s.allCounts[i].wordCount;
				}
			}
		}

		s.calcWpdAllTime = function(){
			//set numDays manually just for dev testing; once user data persists will calculate daysBetween
			var numDaysAUser = 6;
			//var numDays = Math.ceil(s.daysBetween(s.currentUser.dateSignedUp, s.today))
			if(numDaysAUser > 0){
				s.avgWordsPerDayAllTime = Math.round(s.allTimeTotal/numDaysAUser);	
			}
		}

		s.calcWpdYear = function(){
			//setting year manually, will eventually be variable set by user
			var year = 2016;
			var firstOfYear = new Date(year, 0, 1)
			if(year === s.today.getFullYear()){
				var numDays = Math.ceil(s.daysBetween(firstOfYear, s.today))
			} else {
				var lastOfYear = new Date(year, 11, 31)
				//add 1 to get all 365 days
				var numDays = Math.ceil(s.daysBetween(firstOfYear, lastOfYear)) + 1;
			}
			s.avgWordsPerDayYear = Math.round(s.currentYearTotal/numDays);
		}

		s.calcWpdMonth = function(){
			//setting year + month manually, will eventually be variable set by user
			var month = 7;
			var year = 2016;
			var firstOfMonth = new Date(year, month, 1)
			if(month === s.today.getMonth()){
				var numDays = Math.ceil(s.daysBetween(firstOfMonth, s.today))
			} else {
				var lastOfMonth = new Date(year, month +1, 0)
				//add 1 to get all days of month
				var numDays = Math.ceil(s.daysBetween(firstOfMonth, lastOfMonth) +1)
			}
			s.avgWordsPerDayMonth = Math.round(s.currentMonthTotal/numDays);
		}
		


//Helper functions for date calculations
		function standardizeToUTC(date) {
			var result = new Date(date);
			result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
			return result;
		}

		s.daysBetween = function(startDate, endDate) {
			var millisecondsPerDay = 24 * 60 * 60 * 1000;
			return (standardizeToUTC(endDate) - standardizeToUTC(startDate)) / millisecondsPerDay;
		}

		Date.prototype.areDatesSame = function(date) {
		  return (
		    this.getFullYear() === date.getFullYear() &&
		    this.getMonth() === date.getMonth() &&
		    this.getDate() === date.getDate()
		  );
		}
		
//Form submission functions

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
			s.calcMonthTotal(8);
			s.calcWpdAllTime();
			s.calcWpdYear();
			s.calcWpdMonth();
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
				s.users.push(s.currentUser)
				
				s.user = {};
				s.showloginform=false;
				s.showprojectform = true;
			}
			//console.log(s.currentUser)
			
		}

	}])