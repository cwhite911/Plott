'use strict';

angular.module('plott')
.factory('FingerprintFactory', function($http, $interval){

    //Private varibales
    var status = false,
        tracksIntervalPromise;

    function sum (a,b){
      return a + b;
    }

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
      getPosition: function(method){
        status = true;
        if (method === 'trilateration'){
          return $http.get('/tracks/signalToPoint');
        }
        else{
          return $http.get('/tracks/fingerPrint', {cache: false});
        }

      },

      save: function(){

      },
      getAll: function(){},
      findOne: function(){},
      findGroup: function(){},
      weigthedMean: function(fc, callback){
        var newX,
            newY,
            coords,
            topSumX = 0,
            topSumY = 0,
            score,
            weight,
            sumNormalize = [],
            wieghtMeanSum = 0;
            fc = fc.features;
            var attr;

        //Get the sum of the score to normalize
        for (var i = 0, len= fc.length; i < len; i++){
            sumNormalize.push(fc[i].properties.score);
        }

        //Get the sum of the scores;
        var total = sumNormalize.reduce(function(a,b, i){
          if (i < 5){
            return a + b;
          }
        });

        for (var i = 0, len= fc.length; i < len; i++){
            coords = fc[i].geometry.coordinates;
            score = fc[i].properties.score;
            weight = (100 - ((score / total) * 100)).toFixed(2);
            topSumX+=(weight * coords[0]);
            topSumY+=(weight * coords[1]);
            wieghtMeanSum+=parseFloat(weight);

        }

        //Divide by total weight
        newX = (topSumX / wieghtMeanSum).toFixed(15);
        newY = (topSumY / wieghtMeanSum).toFixed(15);
        //Set callback to return estimated latlng
        callback([newY, newX]);

      }
    };


    return (Track);

  });
