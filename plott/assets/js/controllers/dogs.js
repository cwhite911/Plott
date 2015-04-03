'use strict';

angular.module('plott')
  .controller('dogsCtrl', ['$http', '$scope', 'geocoder',
    function ($http, $scope, geocoder) {

      $scope.dog = {};
      $scope.dog.breed = 'Select a breed';
      $scope.breeds;

      $http.get('/breeds')
        .success(function(res){
          $scope.breeds = res;
        })
        .error(function(err){
          console.log(err);
        });

      $scope.save = function (data){
          var config = {
            url: '/dogs/create',
            method: 'POST',
            params: data
          };
          $http(config).success(function(res){
            console.log(res);
          })
          .error(function(err){
            console.log(err);
          });


      };

    }]);
