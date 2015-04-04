'use strict';

angular.module('plott')
  .controller('coverageCtrl', ['$scope', '$http', '$filter', '$interval', 'TrackFactory', 'FingerprintFactory',
    function ($scope, $http, $filter, $interval, TrackFactory, FingerprintFactory) {
      var map, config, sample, mapController, timerController;

      var track = new TrackFactory();
      var finger = new FingerprintFactory();
      // io.socket.get('/coverage/getWifi/');

      L.mapbox.accessToken = 'pk.eyJ1IjoiY3R3aGl0ZSIsImEiOiJvVTRNU3NFIn0.dQWbo15StntDe01rdlDjfQ';
      // Create a map in the div #map
      map = L.mapbox.map('map', 'ctwhite.l4hma6jb', {
        zoomControl: false
      });

      //Adds legend to map
      map.legendControl.addLegend(document.getElementById('legend').innerHTML);

      //Adds maps controls
      mapController = L.Control.extend({
        options: {
          position: 'topleft'
        },

        onAdd: function (map) {
            var container = L.DomUtil.get('map-control');
            return container;
        }
    });

    map.addControl(new mapController());

    //Adds timer to map
    timerController = L.Control.extend({
      options: {
        position: 'topright'
      },

      onAdd: function (map) {
          var container = L.DomUtil.get('timer');
          return container;
      }
  });

  map.addControl(new timerController());

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





        //Gets current position using WiFi finger printing.
        // $scope.fingerPoint;
        // finger.getPosition().then(function(response){
        //   response.data.features = $filter('orderBy')(response.data.features, 'properties.score').splice(0, 5);
        //   finger.weigthedMean(response.data, function(latLng){
        //     if(!$scope.fingerPoint){
        //       $scope.fingerPoint = L.marker(latLng);
        //       // map.panTo(point.getLatLng());
        //       $scope.fingerPoint.addTo(map);
        //     }
        //     $scope.fingerPoint.setLatLng(latLng);
        //     $scope.fingerPoint.update();
        //
        //   });
        // });





        // $http.get('/tracks/fingerPrint').then(function(response){
        //
        //   $scope.fingerPoint = undefined;
        //   response.data.features = $filter('orderBy')(response.data.features, 'properties.score').splice(0, 5);
        //   console.log(response.data);
        //   var bestGuess = weigthedMean(response.data, function(point){
        //     $scope.fingerPoint = point;
        //     // map.panTo(point.getLatLng());
        //     $scope.fingerPoint.addTo(map);
        //   });
        //
        //   L.geoJson(response.data, {
        //     pointToLayer: function (feature, latlng){
        //       return L.circleMarker(latlng, {
        //         fillColor: '#FF7400',
        //         radius: 4,
        //         color: '#FFB273',
        //         weight: 1,
        //         fillOpacity: 1
        //       });
        //     },
        //     onEachFeature: function(feature, layer){
        //       layer.on({
        //         mouseover: highlightFeature,
        //         // click: zoomToFeature
        //     });
        //       // layer.bindPopup(feature.properties.score);
        //       // console.log(feature.properties.score);
        //     }
        //   }).addTo(map);
        //
        //   var tin = turf.tin(response.data, 'score');
        //
        //   L.geoJson(tin).addTo(map);
        // });

        //Get heatmap data//////////////////////////////////////////////////////////////////////////////////////////////
        $http.get('/coverage/getHeatMap').then(function (response) {
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        $scope.currentPos;
        $scope.isCollecting = track.getStatus();


        $scope.getTrack = function (){
          $scope.fingerLine;
          $scope.latLngs = [];
          track.setStatus(true);
          $scope.isCollecting = track.getStatus();
          $scope.tracksIntervalPromise = $interval(function(){

            //FingerPrint Method//////////////////////////////////////////////////////////////////
            $scope.fingerPoint;

            finger.getPosition().then(function(response){
              response.data.features = $filter('orderBy')(response.data.features, 'properties.score').splice(0, 5);
              finger.weigthedMean(response.data, function(latLng){
                if(!$scope.fingerPoint){
                  console.log(latLng);
                  $scope.fingerPoint = L.marker(latLng);
                  $scope.fingerPoint.addTo(map);
                  // map.panTo(point.getLatLng());
                }
                else{
                  //Update marker location
                  $scope.fingerPoint.setLatLng(latLng);
                  $scope.fingerPoint.update();
                }

                //Add path to maps
                if ($scope.latLngs.length < 2){
                  $scope.latLngs.push($scope.fingerPoint.getLatLng());
                }
                else if ($scope.latLngs.length === 2){
                  $scope.fingerLine = L.polyline($scope.latLngs, {color: 'red', dashArray: '15, 10, 5, 10'}).addTo(map);
                  $scope.latLngs.push($scope.fingerPoint.getLatLng());
                }
                else{
                  //Add new point to line
                  $scope.fingerLine.addLatLng(latLng);
                }

              });
            });

            ////////////////////////////////////////////////////////////////////////////////////////////

            //Trilateration Method/////////////////////////////////////////////////////////////
            finger.getPosition('trilateration').then(function(response){
              track.addPosition(response.data.features[0]);
              $scope.currentPos = L.geoJson(response.data, {
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

            //////////////////////////////////////////////////////////////////////////////

          }, 250);
        };

        //Stop collecting track data

        $scope.stopTrack = function(){
          if (angular.isDefined($scope.tracksIntervalPromise)) {
            $interval.cancel($scope.tracksIntervalPromise);
            $scope.isCollecting = track.setStatus(false).getStatus();
            $scope.tracksIntervalPromise = undefined;
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
