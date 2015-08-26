'use strict';

angular.module('workspaceApp')
  .controller('DashboardCtrl', function ($scope, $http, Auth) {
    $scope.polls = [];
    $scope.anyPolls = [];
    $scope.poll ={};
    $scope.poll.question = '';
    $scope.poll.options = [{text: ''}, {text: ''}];
    $scope.getCurrentUser = Auth.getCurrentUser;

    $http.get('/api/polls/user/' + Auth.getCurrentUser()._id).success(function(polls) {
      $scope.polls = polls;
    });

    $http.get('/api/polls/').success(function(polls) {
      $scope.anyPolls = polls;
    });

    $scope.addNewChoice = function() {
      $scope.poll.options.push({text: ''});
    };

    $scope.addPoll = function(form) {
      if(form.$valid) {
        if($scope.poll.question === '') {
          return;
        }
        var options = [];
        for (var i = 0; i < $scope.poll.options.length; i++) {
          if ($scope.poll.options[i].text !== '') {
            options.push({text: $scope.poll.options[i].text, count: 0});
          }
        }
        var newPoll = { question: $scope.poll.question, options: options, owner: Auth.getCurrentUser()._id };
        $scope.polls.push(newPoll);
        $http.post('/api/polls', newPoll)
          .success(function handlePost (newObj) {
            $scope.polls.pop();
            $scope.polls.push(newObj);
          });
        $scope.poll.question = '';
        $scope.poll.options = [{text: ''}, {text: ''}];
      }

    };

    $scope.delete = function(poll) {
      $http.delete('/api/polls/' + poll._id);
      angular.forEach($scope.polls, function(p, i) {
        if (p === poll) {
          $scope.polls.splice(i, 1);
        }
      });
    };
  });
