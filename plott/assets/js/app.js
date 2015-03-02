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
    'ngRoute'
  ])
  .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '../templates/index.html',
      })
      .when('/coverage', {
        templateUrl: '../templates/coverage.html',
        controller: 'coverageCtrl'
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
