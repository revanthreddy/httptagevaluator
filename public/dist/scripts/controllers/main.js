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
    $scope.invalid = false;
    $scope.showLoader = false;
    $scope.showContent = false;
    
    $scope.highlight= function(tag){
        console.log(tag);
        var startTag = '<'+tag;
        var endTag = '</'+tag;
      $("#sourceCodeContent").unhighlight();
      $("#sourceCodeContent").highlight([startTag , endTag]);
    };
    
      $scope.evaluateUrl = function(url){
          
          if(!url)
              $scope.invalid = true;
          else{
//          $scope.showSideBar = false;
//          $scope.showSourceCode = false;
          
          $scope.showLoader= true;
          $scope.showContent = false;
          
        $http.post('/', {"url": url}).
        success(function(data, status, headers, config) {
            console.log("success hndler "+status);
            
            if(status === 404){
                $scope.showLoader= false;
                alert(url + " not found");
            }else{
            $scope.showLoader= false;
            $scope.tags = data.summary;
            $scope.sourceCode = data.source;
            $scope.showContent = true;
//            $scope.showSourceCode = true;
            }
        }).
        error(function(data, status, headers, config) {
            console.log("error handler "+status+" "+ data);
            $scope.showLoader= false;
            alert(url + " not found");
            
                
            
      });
          }
    };
    
  });
