'use strict';

angular.module('plott')
.directive('stopWatch', ['$interval', '$filter' , function ($interval, $filter) {
  return {
    restrict: 'E',
    transclude: true,
    // scope: {
    //   project: '='
    // },
    templateUrl: 'templates/stop-watch.html',
    link: function (scope, element) {

      scope.time = {
        hour: 0,
        min: 0,
        sec: 0,
        current: '00:00:00',
        display: function (){

          scope.time.hour = parseInt(scope.time.hour, 10);
          scope.time.min = parseInt(scope.time.min, 10);
          scope.time.sec = parseInt(scope.time.sec, 10);

          if (scope.time.sec < 10){
            scope.time.sec = 0 + scope.time.sec.toString();
          }
          if (scope.time.min < 10){
            scope.time.min = 0 + scope.time.min.toString();
          }
          if (scope.time.hour < 10){
            scope.time.hour = 0 + scope.time.hour.toString();
          }


          // d.setHours(scope.time.hour,scope.time.min,scope.time.sec);
          // return $filter('date')(d, 'h:mm:ss');
          return scope.time.hour + ':' + scope.time.min + ':' + scope.time.sec;
        }
      };

      //Start timer
      scope.start = function (){
        $interval(function(){
          if (scope.time.sec < 60){
            scope.time.sec++;
          }
          else if (scope.time.sec === 60){
            scope.time.min++;
            scope.time.sec = '00';
          }
          else if (scope.time.min === 60){
            scope.time.hour++;
            scope.time.min = '00';
          }
          scope.time.current = scope.time.display();
        }, 1000);
      };

      //Stop timer
      scope.stop = function (){

      };

      //Reset timer
      scope.reset = function (){

      };


    }
  }
}]);
