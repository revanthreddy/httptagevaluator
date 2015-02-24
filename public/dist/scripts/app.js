'use strict';

/**
 * @ngdoc overview
 * @name htmlevaluatorUiApp
 * @description
 * # htmlevaluatorUiApp
 *
 * Main module of the application.
 */
angular
  .module('htmlevaluatorUiApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'angular-highlight',
    'angular-spinkit'
  ])
  .config(function ($routeProvider) {
    $routeProvider
//      .when('/', {
//        templateUrl: 'views/home.html',
//        controller: 'HomeCtrl'
//      })
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
