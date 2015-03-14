'use strict';

angular.module('plott')
.directive('stopWatch', function(StopWatchFactory) {
  return {
    restrict: 'E',
    transclude: true,
    // scope: {
    //   project: '='
    // },
    templateUrl: 'templates/stop-watch.html',
    link: function (scope, element) {
      scope.stopwatch = new StopWatchFactory();

  }
  }
});
