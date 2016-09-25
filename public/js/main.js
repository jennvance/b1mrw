angular.module('app', []);

angular.module('app')
	.controller('wordCountroller', ['$scope', '$http', function($scope, $http){
		var s = $scope;
		s.test = "Hi Jenn";
		//not necessary, but semantically useful
		//s.user = {};
		s.users=[];

		s.User = function(user){
			this.name = user.name;
		}



		

		

		s.submitLogin = function(){
			s.user = new s.User(s.user);
			s.users.push(s.user)
			console.log(s.users)
			s.user = {};
		}
	}])