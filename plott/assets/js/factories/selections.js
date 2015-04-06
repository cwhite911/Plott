'use strict';

angular.module('plott')
.factory('selectionsFactory', ['$http', '$q', function($http, $q){
  var selections = {
    dogs: function (options){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/dogs',
        params: options
      }).success(function (data) {
        deferred.resolve(data);
      });
      return deferred.promise;
    },
    owners: function (options){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/owners',
        params: options
      }).success(function (data) {
        deferred.resolve(data);
      });
      return deferred.promise;
    },
    hides: function(){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/hides'
      }).success(function (data) {
        deferred.resolve(data);
      });
      return deferred.promise;
    },
    locations: function(){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/locations'
      }).success(function (data) {
        deferred.resolve(data);
      });
      return deferred.promise;
    },
    breeds: function(){
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/breeds'
      }).success(function (data) {
        deferred.resolve(data);
      });
      return deferred.promise;
    }

  };

  return (selections);

}]);
