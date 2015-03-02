/**
 * CoverageController
 *
 * @description :: Server-side logic for managing coverages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var wifiscanner = require('node-wifiscanner');

//Converts dBm to quality
function signalQualityToPernect (dBm) {
	var quality;
		if (dBm <= -100){
			quality = 0;
		}
		else if (dBm >= -50){
			quality = 100;
		}
		else {
			quality = 2 * (dBm + 100);
		}
		quality = parseFloat((quality / 100).toFixed(2));
	return quality;
}

module.exports = {

	//scan local-wifi
	getWifi: function (req, res){
		var spotInfo,
				geom = req.query.geom;

		wifiscanner.scan(function(err, data){
			if (err) {
				console.log("Error : " + err);
				return;
			}
			spotInfo = {
				timeStamp: +new Date(),
				data: data,
				geom: geom
			};
			Coverage.create(spotInfo).exec(function createCB(err,created){
				if (err){
					console.error(err);
				}
  			console.log(created.data.length + ' access points collected.');
  		});
			res.send(spotInfo);
		});
	},

	//Returns data needed to generate heat map on a given day, location, or combination.
	getHeatMap: function (req, res){
		// {lat: 24.6408, lng:46.7728, count: 3}
		var len, sum, avg, geojson, heat = [];

		Coverage.find({}).exec(function findCB(err,found){
			found.forEach(function(rec){
				if (rec.geom){
					len =rec.data.length;
					sum = 0;
					avg = 0;
					rec.data.forEach(function(i){
						sum+= signalQualityToPernect(i.signal_level);
					});
					avg = (sum/len) * 100;
					geojson = JSON.parse(rec.geom);
					heat.push([geojson.geometry.coordinates[1], geojson.geometry.coordinates[0], avg]);
				}

			});

			res.json(heat);

  	});

	}

};
