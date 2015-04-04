'use strict';

/**
 * @ngdoc overview
 * @name asbuiltsApp
 * @description
 * # asbuiltsApp
 *
 * Main module of the application.
 */
angular
  .module('plott', [
    'ngRoute',
    'toggle-switch',
    'angularFileUpload'
  ])
  .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '../templates/index.html',
      })
      .when('/register', {
        templateUrl: '../templates/register.html',
        controller: 'registerCtrl'
      })
      .when('/coverage', {
        templateUrl: '../templates/coverage.html',
        controller: 'coverageCtrl'
      })
      .when('/locations', {
        templateUrl: '../templates/locations.html',
        controller: 'locationsCtrl'
      })
      .when('/dogs', {
        templateUrl: '../templates/dogs.html',
        controller: 'dogsCtrl'
      })
      // .when('/error', {
      //   templateUrl: '404.html'
      // })
      .otherwise({
        redirectTo: '/'
      });

      $httpProvider.defaults.useXDomain = true;
      delete $httpProvider.defaults.headers.common['X-Requested-With'];

  }]);
