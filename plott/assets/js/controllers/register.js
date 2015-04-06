'use strict';

angular.module('plott')
  .controller('registerCtrl', ['$http', '$scope', 'registerFactory',
    function ($http, $scope, registerFactory) {
      $scope.register = function (options){
        registerFactory.register(options).then(function(res){
          console.log(res);
        },
        function(err){
          console.log(err);
        })
      };

    }]);
