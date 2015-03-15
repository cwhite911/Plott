'use strict';

angular.module('plott')
  .controller('coverageCtrl', ['$scope', '$http', '$filter', '$interval',
    function ($scope, $http, $filter, $interval) {
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

          //Checks if user wants to add a new sample point if they do data is prepared to be sent to api
          if ($scope.addSample){
            $scope.markers = e.latlng;
            sample = L.marker(e.latlng).addTo(map);
            config = {
              params: {
                geom: sample.toGeoJSON()
              }
            };


            //Gets RSSs from avaliable WiFi access points and point where sample was taken and add record to database
            $http.get('/coverage/getWifi', config).then(function(response) {
              console.log(response);
              $scope.spotCoverage = {
                signals: response.data.data,
                time: response.timeStamp
              };
            },
            function(err){
              console.log(err);
            });
          }
        });


        //Get heatmap data
        $http.get('/coverage/getHeatMap').then(function (response) {
          console.log(response.data.length);
          var heat = L.heatLayer(response.data, {
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
        $scope.isCollecting = false;
        $scope.getTrack = function (){
          $scope.isCollecting = true;
          $scope.tracksInterval = $interval(function(){
            $http.get('/tracks/signalToPoint').then(function(response){
              console.log(response);
              $scope.currentPos = L.geoJson(response.data, {
                style: function (feature) {
                  return {color: '#63fa11'};
                },
                pointToLayer: function (feature, latlng){
                  return L.circleMarker(latlng, {
                    fillColor: '#FF7400',
                    radius: 4,
                    color: '#FFB273',
                    weight: 1,
                    fillOpacity: 1
                  });
                }
              }).addTo(map);
            },
            function(err){
              console.log(err);
            });
          }, 250);
        };

        //Stop collecting track data

        $scope.stopTrack = function(){
          if (angular.isDefined($scope.tracksInterval)) {
            $interval.cancel($scope.tracksInterval);
            $scope.isCollecting = false;
            $scope.tracksInterval = undefined;
          }
        };

        $scope.saveTrack = function(){
          if (angular.isDefined($scope.tracksInterval)) {
            $interval.cancel($scope.tracksInterval);
            $scope.isCollecting = false;
            $scope.tracksInterval = undefined;
          }
        };



}]);
