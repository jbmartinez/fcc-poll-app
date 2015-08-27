'use strict';

angular.module('workspaceApp')
  .controller('VoteCtrl', function ($scope, $http, $routeParams, Auth) {
    $scope.optionData = {text: ''};
    $scope.labels = [];
    $scope.data = [];
    $scope.userVoted = false;
    $scope.isLoggedIn = Auth.isLoggedIn;

    $http.get('/api/polls/' + $routeParams.pollid).success(function(poll) {
      $scope.poll = poll;
    });

    $scope.vote = function(form) {
      var i = 0;
      var found = false;
      while (i < $scope.poll.options.length && !found) {
        if ($scope.poll.options[i].text === $scope.optionData.text) {
          $scope.poll.options[i].count = Number($scope.poll.options[i].count) + 1;
          found = true;
        }
        i++;
      }

      // format data for the chart
      for (var i = 0; i < $scope.poll.options.length; i++) {
        $scope.labels.push($scope.poll.options[i].text);
        $scope.data.push($scope.poll.options[i].count);
      }
      $http.put('/api/polls/' + $routeParams.pollid, $scope.poll);
      $scope.userVoted = true;
    };
  });
