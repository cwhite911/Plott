'use strict';

angular.module('plott')
  .controller('coverageCtrl', ['$scope', '$http', '$filter', 'leafletData',
    function ($scope, $http, $filter, leafletData) {
      //Get User location
      function onLocationFound(e) {
        var radius = e.accuracy / 2;
        console.log('Hey');
          L.marker(e.latlng).addTo(map)
            .bindPopup("You are within " + radius + " meters from this point").openPopup();
            L.circle(e.latlng, radius).addTo(map);
      }

      //Location error
      function onLocationError(e) {
        alert(e.message);
      }

      leafletData.getMap().then(function(map) {

        // L.GeoIP.centerMapOnPosition(map, 15);
        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);
        map.on('click', function (e){
          console.log(e.latlng);
          $scope.markers.m1 = e.latlng;
        });
      });
      angular.extend($scope, {
        ruffin: {
          lat: 36.022014982938515,
          lng: -78.90247553586958,
          zoom: 22
        },
        markers: {
          m1: {
            lat: 36.022014982938515,
            lng: -78.90247553586958,
          }
        },
        layers: {
          baselayers: {
            darkRaleigh: {
              name: 'Raleigh - Dark',
              url: 'https://{s}.tiles.mapbox.com/v3/ctwhite.l4hma6jb/{z}/{x}/{y}.png',
              type: 'xyz'
            },
          },
          overlays: {
            ruffin: {
        		  name: "2004 Ruffin St",
        			type: "dynamic",
        			url: "http://152.46.19.33/arcgis/rest/services/plott/Ruffin/MapServer",
        			visible: true,
        			layerOptions: {
        		    layers: [0, 1, 2],
        				opacity: 1,
        				attribution: "Copyright:© 2015 Corey White, Plott"
        			}
        	  },
          }
        },
      });
}]);
