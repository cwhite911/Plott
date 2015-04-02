'use strict';

angular.module('plott')
  .controller('locationsCtrl', ['$http', '$scope',
    function ($http, $scope) {

      $scope.loc = {};
      $scope.loc.state = 'NC';
      $scope.states = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY', 'AE', 'AA', 'AP'];

      $scope.save = function (data){
        data.locationid = 1;
        var config = {
          url: '/locations/create',
          method: 'POST',
          params: data
        }
        $http(config).success(function(res){
          console.log(res);
        })
        .error(function(err){
          console.log(err);
        });
      };

    }]);
