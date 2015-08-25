'use strict';

angular.module('workspaceApp')
  .controller('VoteCtrl', function ($scope, $http, $routeParams) {
    $scope.optionData = {text: ''};
    
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
      $http.put('/api/polls/' + $routeParams.pollid, $scope.poll);
    };
  });
