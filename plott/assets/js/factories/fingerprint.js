'use strict';

angular.module('plott')
.factory('FingerprintFactory', function($http, $interval){

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
        return   $http.get('/tracks/fingerPrint', {cache: false});
      },

      save: function(){},
      getAll: function(){},
      findOne: function(){},
      findGroup: function(){},
      weigthedMean: function(fc, callback){
        var newX,
            newY,
            coords,
            topSumX = 0,
            topSumY = 0,
            wieghtMeanSum = 1;
            fc = fc.features;
        for (var i = 0, len= fc.length; i < len; i++){
            coords = fc[i].geometry.coordinates;
            switch(i){
              case 0:
                //Calculate x
                topSumX+=(.50 * coords[0]);

                //Calculate y
                topSumY+=(.50 * coords[1]);
                break;
              case 1:
                //Calculate x
                topSumX+=(.25 * coords[0]);

                //Calculate y
                topSumY+=(.25 * coords[1]);
                break;
              case 2:
                //Calculate x
                topSumX+=(.15 * coords[0]);

                //Calculate y
                topSumY+=(.15 * coords[1]);
                break;
              case 3:
                //Calculate x
                topSumX+=(.08 * coords[0]);

                //Calculate y
                topSumY+=(.08 * coords[1]);
                break;
              case 4:
                //Calculate x
                topSumX+=(.02 * coords[0]);

                //Calculate y
                topSumY+=(.02 * coords[1]);
                break;
              default:
                console.log('Whoops something did not work');
            }
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
