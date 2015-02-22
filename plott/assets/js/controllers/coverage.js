'use strict';

angular.module('plott')
  .controller('coverageCtrl', ['$scope', '$http', '$filter', 'leafletData',
    function ($scope, $http, $filter, leafletData) {
      //Get User location
      function onLocationFound(e) {
        var radius = e.accuracy / 2;
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
      });
      angular.extend($scope, {
                ruffin: {
                  lat: 36.02215599035083,
                  lng: -78.90300929546356,
                  zoom: 21
                },
                markers: {
                    m1: {
                      lat: 36.02215599035083,
                      lng: -78.90300929546356,
                    }
                },
                layers: {
                    baselayers: {
        				    	world: {
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

                    },
                },
            });

    }]);
