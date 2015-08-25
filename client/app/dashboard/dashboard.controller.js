'use strict';

angular.module('workspaceApp')
  .controller('DashboardCtrl', function ($scope, $http, Auth) {
    $scope.polls = [];
    $scope.question = '';
    $scope.options = [{text: ''}, {text: ''}];
    $scope.getCurrentUser = Auth.getCurrentUser;

    $http.get('/api/polls').success(function(polls) {
      $scope.polls = polls;
    });
    
    $scope.addNewChoice = function() {
      $scope.options.push({text: ''});
    };

    $scope.addPoll = function(form) {
      if(form.$valid) {
        if($scope.question === '') {
          return;
        }
        var options = [];
        for (var i = 0; i < $scope.options.length; i++) {
          if ($scope.options[i].text !== '') {
            options.push({text: $scope.options[i].text, count: 0});
          }
        }
        $http.post('/api/polls', { question: $scope.question, options: options, owner: Auth.getCurrentUser()._id });
        $scope.question = '';
        $scope.options = [{text: ''}, {text: ''}];
      }
       
    };
    
    $scope.delete = function(poll) {
      //Polls.remove({ id: poll._id });
      $http.delete('/api/polls/' + poll._id);
      angular.forEach($scope.polls, function(p, i) {
        if (p === poll) {
          $scope.polls.splice(i, 1);
        }
      });
    };
  });
