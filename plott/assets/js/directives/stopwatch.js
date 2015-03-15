'use strict';

angular.module('plott')
.directive('stopWatch', function(StopWatchFactory) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      status: '='
    },
    templateUrl: 'templates/stop-watch.html',
    link: function (scope, element) {
      scope.status;
      scope.stopwatch = new StopWatchFactory();
      scope.$watch('status', function(){
        if (scope.status){
          scope.stopwatch.reset().start();
        }
        else{
          scope.stopwatch.stop();
        }
      })

  }
  }
});
