'use strict';

angular.module('plott')
  .controller('locationsCtrl', ['$http', '$scope', 'geocoder',
    function ($http, $scope, geocoder) {

      $scope.loc = {};
      $scope.loc.state = 'NC';
      $scope.states = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM',
       'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD',
        'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
         'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT',
          'VI', 'VA', 'WA', 'WV', 'WI', 'WY', 'AE', 'AA', 'AP'];

      $scope.save = function (data){
        geocoder.request(data).then(function(point){
          return point;
        },
        function(err){
          console.log(err);
        }).then(function(point){
          console.log(data);
          delete data.format;
          data.locationid = 2;
          // data.id = 1;
          // data.geom = 'GEOMETRY(POINT(' + point[0].lon + ' ' + point[0].lat + '), 4326)';
          data.coordinates = {lat: parseFloat(point[0].lat), lng: parseFloat(point[0].lon)};
          var config = {
            url: '/locations/create',
            method: 'POST',
            params: data
          };
          $http(config).success(function(res){
            console.log(res);
          })
          .error(function(err){
            console.log(err);
          });
        });

      };

    }]);
