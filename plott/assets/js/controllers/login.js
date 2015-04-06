'use strict';

angular.module('plott')
  .controller('loginCtrl', ['$scope', 'registerFactory',
    function ($scope, registerFactory) {
      $scope.login = function (options){
        console.log(options);
        registerFactory.login(options).then(function(res){
          console.log(res);
        },
        function(err){
          console.log(err);
        })
      };

    }]);
