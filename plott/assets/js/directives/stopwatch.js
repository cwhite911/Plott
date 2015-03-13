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
        mili: 0,
        timeArray: ['hour', 'min', 'sec', 'mili'],
        current: '00:00:00:00',
        display: function (){
          scope.time.timeArray.forEach(function(item){
            scope.time[item] = parseInt(scope.time[item], 10);
            if (scope.time[item] < 10){
              scope.time[item] = 0 + scope.time[item].toString();
            }
          });

          // scope.time.min = parseInt(scope.time.min, 10);
          // scope.time.sec = parseInt(scope.time.sec, 10);
          //
          //
          // if (scope.time.min < 10){
          //   scope.time.min = 0 + scope.time.min.toString();
          // }
          // if (scope.time.hour < 10){
          //   scope.time.hour = 0 + scope.time.hour.toString();
          // }


          // d.setHours(scope.time.hour,scope.time.min,scope.time.sec);
          // return $filter('date')(d, 'h:mm:ss');
          return scope.time.hour + ':' + scope.time.min + ':' + scope.time.sec + ':' + scope.time.mili;
        }
      };

      //Start timer
      scope.start = function(){
        //Create interval set the stopHelper variable to the interval promise so that it can be used in the stop function.
        scope.stopHelper =  $interval(function(){
          if (scope.time.mili < 100){
            scope.time.mili++;
          }
          else if (scope.time.mili === 100){
            scope.time.sec++;
            scope.time.mili = '00';
          }
          // if (scope.time.sec < 60){
          //   scope.time.sec++;
          // }
          if (scope.time.sec === 60){
            scope.time.min++;
            scope.time.sec = '00';
          }
          if (scope.time.min === 60){
            scope.time.hour++;
            scope.time.min = '00';
          }
          scope.time.current = scope.time.display();
        }, 10);
      };

      //Stop timer
      scope.stop = function (){
        if (angular.isDefined(scope.stopHelper)) {
          $interval.cancel(scope.stopHelper);
          scope.stopHelper = undefined;
        }
      };

      //Reset timer
      scope.reset = function (){
        angular.extend(scope.time, {
          hour: 0,
          min: 0,
          sec: 0,
          current: '00:00:00:00'
        });
      };
    }
  }
}]);
