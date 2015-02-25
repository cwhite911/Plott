'use strict';

angular.module('plott')
  .controller('coverageCtrl', ['$scope', '$http', '$filter', 'leafletData',
    function ($scope, $http, $filter, leafletData) {
      var map,
          config,
          sample;
      L.mapbox.accessToken = 'pk.eyJ1IjoiY3R3aGl0ZSIsImEiOiItb0dqdUlZIn0.4Zb1DGESXnx0ePxMVLihZQ';
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
      // leafletData.getMap().then(function(map) {
      //   map.on('click', function (e){
      //     console.log(e.latlng);
      //     $scope.markers.m1 = e.latlng;
      //   });
      // });
      // angular.extend($scope, {
      //   ruffin: {
      //     lat: 36.022014982938515,
      //     lng: -78.90247553586958,
      //     zoom: 22
      //   },
      //   markers: {
      //     m1: {
      //       lat: 36.022014982938515,
      //       lng: -78.90247553586958,
      //     }
      //   },
      //   layers: {
      //     baselayers: {
      //       darkRaleigh: {
      //         name: 'Dark',
      //         url: 'https://{s}.tiles.mapbox.com/v3/ctwhite.5ad645ec/{z}/{x}/{y}.png',
      //         type: 'xyz'
      //       },
      //     },
          // overlays: {
          //   ruffin1: {
          //     name: 'Mapbox',
          //     url: 'https://{s}.tiles.mapbox.com/v3/ctwhite.b8761bb5/{z}/{x}/{y}.png',
          //     type: 'xyz',
          //     visible: true
          //   },
            // ruffin: {
        		//   name: "2004 Ruffin St",
        		// 	type: "dynamic",
        		// 	url: "http://152.46.19.33/arcgis/rest/services/plott/Ruffin/MapServer",
        		// 	visible: false,
        		// 	layerOptions: {
        		//     layers: [0, 1, 2],
        		// 		opacity: 1,
        		// 		attribution: "Copyright:© 2015 Corey White, Plott"
        		// 	}
        	  // },
          // }
      //   },
      // });
}]);
