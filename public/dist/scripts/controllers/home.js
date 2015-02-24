'use strict';

/**
 * @ngdoc function
 * @name htmlevaluatorUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the htmlevaluatorUiApp
 */
angular.module('htmlevaluatorUiApp')
  .controller('HomeCtrl', function ($scope , $http , $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    
    $scope.evaluateUrl = function(url){
    console.log("in home "+escape(url));
    
      $location.path("/search/"+escape(url));
    };
    
  });
