'use strict';

/**
 * @ngdoc function
 * @name htmlevaluatorUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the htmlevaluatorUiApp
 */
angular.module('htmlevaluatorUiApp')
  .controller('MainCtrl', function ($scope , $http , $routeParams) {
    
    $scope.highlight= function(tag){
        console.log(tag);
        var startTag = '<'+tag;
        var endTag = '</'+tag;
      $("#sourceCodeContent").unhighlight();
      $("#sourceCodeContent").highlight([startTag , endTag]);
    };
    
      $scope.evaluateUrl = function(url){
          $scope.showLoader= true;
          $scope.showSideBar = false;
          $scope.showSourceCode = false;
          
        $http.post('http://localhost:3000/', {"url": url}).
        success(function(data, status, headers, config) {
            console.log("error hndler "+status)
            
            if(status === 404){
                $scope.showLoader= false;
                $scope.showSourceCode = true;
                $scope.sourceCode = data.hostname +"not found";
                
            }else{
            $scope.showLoader= false;
            $scope.tags = data.summary;
            $scope.sourceCode = data.source;
            $scope.showSideBar = true;
            $scope.showSourceCode = true;
            }
        }).
        error(function(data, status, headers, config) {
            console.log("error hndler "+status);
            if(status === 404){
                $scope.showLoader= false;
                console.log(data);
                $scope.sourceCode = data.hostname +"not found";
                $scope.showSourceCode = true;
                
            }
      });
    };
    
  });
