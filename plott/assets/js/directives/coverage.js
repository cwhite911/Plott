'use strict';

angular.module('plott')
  .directive('coverageData', function () {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        data: '='
      },
      templateUrl: 'templates/coverage-data.html',
      link: function (scope) {
        // Object.observe(scope.data, function(change){
        //   scope.data = change;
          scope.$watch('data', function(){

          });
        // });
      }
    }
  });
