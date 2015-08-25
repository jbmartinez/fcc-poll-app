'use strict';

angular.module('workspaceApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/vote/:pollid', {
        templateUrl: 'app/vote/vote.html',
        controller: 'VoteCtrl'
      });
  });
