'use strict';

angular.module('plott')
  .controller('coverageCtrl', ['$scope', '$http', '$filter',
    function ($scope, $http, $filter) {
      var map, config, sample;



      L.mapbox.accessToken = 'pk.eyJ1IjoiY3R3aGl0ZSIsImEiOiJvVTRNU3NFIn0.dQWbo15StntDe01rdlDjfQ';
      // Create a map in the div #map
      map = L.mapbox.map('map', 'ctwhite.l4hma6jb', {
        zoomControl: false
      });

      //Disable drag and zoom handlers
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();

      // Disable tap handler, if present.
      if (map.tap) map.tap.disable();

      //Add sample point on click and post results to mongodb
        map.on('click', function (e){
          console.log(e.latlng);
          $scope.markers = e.latlng;
          sample = L.marker(e.latlng).addTo(map);
          config = {
            params: {
              geom: sample.toGeoJSON()
            }
          };

          $http.get('/coverage/getWifi', config).then(function (data) {
            console.log(data);
          },
          function(err){
            console.log(err);
          });

        });

        console.log(L.heatLayer);
        //Get heatmap data
        $http.get('/coverage/getHeatMap').then(function (data) {
          console.log(data.data);
          var heat = L.heatLayer(data.data).addTo(map);
        },
        function(err){
          console.log(err);
        });


}]);
