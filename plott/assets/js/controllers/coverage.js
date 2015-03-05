'use strict';

angular.module('plott')
  .controller('coverageCtrl', ['$scope', '$http', '$filter',
    function ($scope, $http, $filter) {
      var map, config, sample;

      // io.socket.get('/coverage/getWifi/');

      L.mapbox.accessToken = 'pk.eyJ1IjoiY3R3aGl0ZSIsImEiOiJvVTRNU3NFIn0.dQWbo15StntDe01rdlDjfQ';
      // Create a map in the div #map
      map = L.mapbox.map('map', 'ctwhite.l4hma6jb', {
        zoomControl: false
      });
      map.legendControl.addLegend(document.getElementById('legend').innerHTML);
      //Disable drag and zoom handlers
      map.dragging.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.scrollWheelZoom.disable();

      // Disable tap handler, if present.
      if (map.tap) map.tap.disable();

      //Add sample point on click and post results to mongodb

        map.on('click', function (e){
          console.log(e.containerPoint);
          if ($scope.addSample){
            $scope.markers = e.latlng;
            sample = L.marker(e.latlng).addTo(map);
            config = {
              params: {
                geom: sample.toGeoJSON()
              }
            };


            $http.get('/coverage/getWifi', config).then(function (data) {
              console.log(data);
              $scope.spotCoverage = {
                signals: data.data.data,
                time: data.timeStamp
              };
            },
            function(err){
              console.log(err);
            });
          }
        });


        //Get heatmap data
        $http.get('/coverage/getHeatMap').then(function (data) {
          console.log(data.data.length);
          var heat = L.heatLayer(data.data, {
            minOpacity: 0.2,
            radius: 100,
            blur: 30,
            max: 100
          }).addTo(map);
        },
        function(err){
          console.log(err);
        });

        $scope.currentPos;
        $scope.getTrack = function (){
          $http.get('/tracks/signalToPoint').then(function(data){
            console.log(data);
            $scope.currentPos = L.geoJson(data.data).addTo(map);
            console.log($scope.currentPos);
          },
          function(err){
            console.log(err);
          });
        }


}]);
