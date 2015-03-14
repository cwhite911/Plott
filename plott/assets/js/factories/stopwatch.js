'use strict';

angular.module('plott')
.factory('StopWatchFactory', function($interval){
  //Private
  var stopHelper;

  var Time = function(){
    this.hour = 0;
    this.min = 0;
    this.sec = 0;
    this.mili = 0;
    this.timeArray = ['hour', 'min', 'sec', 'mili'];
    this.current = '00:00:00:00';
    return this;
  };

  Time.prototype = {

    display: function (){
      var that = this;
      this.timeArray.forEach(function(item){
        that[item] = parseInt(that[item], 10);
        if (that[item] < 10){
          that[item] = 0 + that[item].toString();
        }
      });

      return this.hour + ':' + this.min + ':' + this.sec + ':' + this.mili;
    },

  //Start timer
  start: function(){
    var that = this;
    //Create interval set the stopHelper variable to the interval promise so that it can be used in the stop function.
    stopHelper =  $interval(function(){
      if (that.mili < 100){
        that.mili++;
      }
      else if (that.mili === 100){
        that.sec++;
        that.mili = '00';
      }
      if (that.sec === 60){
        that.min++;
        that.sec = '00';
      }
      if (that.min === 60){
        that.hour++;
        that.min = '00';
      }
      that.current = that.display();
    }, 10);
    return this;
  },

  //Stop timer
  stop: function (){
    if (angular.isDefined(stopHelper)) {
      $interval.cancel(stopHelper);
      stopHelper = undefined;
    }
    return this;
  },

  //Reset timer
  reset: function (){
    angular.extend(this, {
      hour: 0,
      min: 0,
      sec: 0,
      current: '00:00:00:00'
    });
    return this;
  }
};

return (Time);

});
