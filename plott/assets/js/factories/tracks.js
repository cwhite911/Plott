'use strict';

angular.module('plott')
.factory('TrackFactory', function($http, $interval){

  //Private varibales
  var status = false,
      tracksIntervalPromise;

  //Track Constructor Class
  var Track = function (){
    this.trackid;
    this.dogid;
    this.hideid;
    this.start_time;
    this.end_time;
    this.geom = {
      "type": "FeatureCollection",
      "features": []
    };
    return this;
  };

  //Track Methods
  Track.prototype = {

    //Set Basic track metadata
    setTrack: function(info){
      angular.extends(this, info);
      return this;
    },

    //Add current postion to geojson to be sent to server
    addPosition: function(feature){
      this.geom.features.push(feature);
      return this;
    },

    //Sets status to true or false whether target is currently being tracked
    setStatus: function(bool){
      if (bool === true || bool === false){
        status = bool;
      }
      return this;
    },
    //Returns true or false whether target is currently being tracked
    getStatus: function(){
      return status;
    },

    //getPostion of Target Device returns promise
    getPosition: function(){
      status = true;
      return $http.get('/tracks/signalToPoint');
    },

    save: function(){},
    getAll: function(){},
    findOne: function(){},
    findGroup: function(){}
  };


  return (Track);

});
