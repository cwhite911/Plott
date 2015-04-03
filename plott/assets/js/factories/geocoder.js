'use strict';

angular.module('plott')
.factory('geocoder', ['$http', '$q', function($http, $q){
  var geocoder = {
    request: function (options){
      options.format = 'json';
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: 'http://nominatim.openstreetmap.org/search',
        params: options
      }).success(function (data) {
        deferred.resolve(data);
      });

      return deferred.promise;
      }

    };

  return (geocoder);

}]);
