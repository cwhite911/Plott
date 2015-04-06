'use strict';

angular.module('plott')
.factory('registerFactory', ['$http', '$q', function($http, $q){
  var selections = {



    register: function (options){
      var deferred = $q.defer();
      $http({
        method: 'POST',
        url: '/auth/local/register',
        data: options
      }).success(function (data) {
        deferred.resolve(data);
      });
      return deferred.promise;
    },



    login: function (options){
      var deferred = $q.defer();
      console.log(options);
      $http({
        method: 'POST',
        url: '/auth/local',
        data: options
      }).success(function (data) {
        console.log(data);
        deferred.resolve(data);
      });
      return deferred.promise;
    },


  };

  return (selections);

}]);
