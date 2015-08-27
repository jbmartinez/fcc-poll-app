'use strict';

angular.module('workspaceApp')
  .controller('MainCtrl', function ($scope, $http, $location, Auth) {
    Auth.isLoggedInAsync(function(loggedIn) {
      if (loggedIn) {
        $location.path('/dashboard');
      }
    });
  });
