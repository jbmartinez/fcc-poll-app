'use strict';

angular.module('workspaceApp')
  .controller('DashboardCtrl', function ($scope, $http, $location, Auth) {
    
    $scope.polls = [];
    $scope.anyPolls = [];
    $scope.poll ={};
    $scope.poll.question = '';
    $scope.poll.options = [{text: ''}, {text: ''}];
    $scope.baseUrl = $location.protocol() + '://' + $location.host() + '/';
    $scope.getCurrentUser = Auth.getCurrentUser;
    
    function initData() {
      $scope.graphVisible = false;
      $scope.labels = [];
      $scope.data = [];
    }
    
    initData();

    $http.get('/api/polls/user/' + Auth.getCurrentUser()._id).success(function(polls) {
      $scope.polls = polls;
    });

    var ctrl = this;
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
    
    $scope.showGraph = function(idx) {
      console.log(idx);
      var poll = $scope.polls[idx];
      for (var i = 0; i < poll.options.length; i++) {
        $scope.labels.push(poll.options[i].text);
        $scope.data.push(poll.options[i].count);
      }
      $scope.graphVisible = true;
    };
    
    $scope.hideGraph = function() {
      //$scope.graphVisible = false;
      // $scope.labels = [];
      // $scope.data = [[]];
      initData();
      ctrl.chart.destroy();
    };
    
    $scope.$on('create', function (event, chart) {
      ctrl.chart = chart;
    });
  });
