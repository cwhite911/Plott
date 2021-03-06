/**
 * TracksController
 *
 * @description :: Server-side logic for managing tracks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var wifiscanner = require('node-wifiscanner'),
		trilateration = require('trilateration'),
		transform = require('proj4geojson'),
						_ = require('underscore'),

		//EPSG:2264 proj4 http://spatialreference.org/ref/epsg/2264/
		sr = '+proj=lcc +lat_1=36.16666666666666 +lat_2=34.33333333333334 +lat_0=33.75 +lon_0=-79 +x_0=609601.2192024384 +y_0=0 +ellps=GRS80 +datum=NAD83 +to_meter=0.3048006096012192 +no_defs';

		//Known exact locatoins of access points
		knownAPs = [
			{
				name: 'Bates',
				mac: '0a:18:d6:53:73:7c',
				// x: -78.902439,
				// y: 36.022025
				x: 2028837.603,
				y: 826942.359,
				// x: 919,
				// y: 393,
				range: 60
			},
			{
				name: 'Chobey',
				mac: 'c8:d7:19:3b:db:ff',
				// x: -78.902483,
				// y: 36.022058
				x: 2028850.515,
				y: 826930.098,
				// x: 787,
				// y: 263,
				range: 20
			},
			{
				name:'Autumn',
				mac: '0a:18:d6:53:73:dc',
				// x: -78.902517,
				// y: 36.021989
				x: 2028827.403,
				y: 826917.403,
				// x: 695,
				// y: 523,
				range: 60
			}
		];
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

// Nor Aida Mahiddin -  University Sultan ZainalAbidin
// Distance, di = p ( 1 – mi ) (1)
// Where;
// m = is the percentage of signal strength
// p = is the maximum coverage of signal
// strength
// i = 1,2,3
function signalToDistance (m, p){
	m = signalQualityToPernect(m);
	var distance = p * (1 - m);
	return distance;
}

module.exports = {

	// Using trilateration technique;
	signalToPoint: function (req, res){
		var geojson = {
  		"type": "FeatureCollection",
  		"features": [
    		{
      		"type": "Feature",
      		"properties": {},
      		"geometry": {
        		"type": "Point",
        		"coordinates": []
      		}
    		}
  		]
		};
		wifiscanner.scan(function(err, data){
			if (err) {
				console.log("Error : " + err);
				return;
			}
			// spotInfo = {
			// 	timeStamp: +new Date(),
			// 	data: data
			// };
			// Coverage.create(spotInfo).exec(function createCB(err,created){
			// 	if (err){
			// 		console.error(err);
			// 	}
			// 	console.log(created.data.length + ' access points collected.');
			// });
			var distance,
			    pos,
					wgs84geojson;
			data.forEach(function(ap){
				for (var i = 0, l = knownAPs.length; i < l; i++){
					if (ap.mac === knownAPs[i].mac){
						console.log(ap.mac);
						//Add Beacon
						trilateration.addBeacon(i, trilateration.vector(knownAPs[i].x, knownAPs[i].y));
						distance = signalToDistance(ap.signal_level, knownAPs[i].range);
						//Setting the beacons distances
						console.log({index: i, distance: distance});
						trilateration.setDistance(i, distance);
					}
				}
			});
		});


		// Start Calculation
		pos = trilateration.calculatePosition();

		console.log("X: " + pos.x + "; Y: " + pos.y);

		//Set coordinates in geojson
		geojson.features[0].geometry.coordinates = [pos.x, pos.y];
		//Converts geojson feature collection coordinates from SRID:2264 to SRID: 4326
		wgs84geojson = transform.to(geojson, sr);
		//Sends the response geojson
		res.json(wgs84geojson);
	},

//WiFi Finger Printing technique
	fingerPrint: function(req, res){
		var inSignal,
				score,
				feature,
				geojson = {
  		"type": "FeatureCollection",
  		"features": []
		};
		wifiscanner.scan(function(err, data){
			if (err) {
				console.log("Error : " + err);
				return;
			}

			var fingerPrints =
			Coverage.find({"data": {$in: data}}).exec(function findCB(err,found){
					found.forEach(function(point){
						getFingerPrintScores(data, point.data, function(score){
							feature = JSON.parse(point.geom);
							feature.properties = score;
							geojson.features.push(feature);
						});
						// geojson.features = _.min(geojson.features, 'feature.properites.score');
					});
					res.json(geojson);
				});
		});
		// res.send(inSignal);
	}


};


function getFingerPrintScores(inArray, refArray, callback){
	var fingerPrint = {
			score: 0,
			total: inArray.length,
			matches: 0
		},
			apScore;

		//Find the differenct between each access point in array
		inArray.forEach(function(ap){
			refArray.forEach(function(ref){
				if (ap.mac === ref.mac && ap.channel === ref.channel){
					fingerPrint.matches++;
					apScore = Math.abs(ap.signal_level - ref.signal_level);
						console.log(apScore);
					//Add all collected scores
					fingerPrint.score+= apScore;
				}
			});
		});
		callback(fingerPrint);
}



// [
//     {
//         "ssid": "ruffin",
//         "mac": "00:1d:7e:a1:a6:d3",
//         "signal_level": -84.5, -80
//         "channel": "1"
//     },
//     {
//         "ssid": "bates",
//         "mac": "0a:18:d6:53:73:7c",
//         "signal_level": -54.5,
//         "channel": "11"
//     },
//     {
//         "ssid": "bates",
//         "mac": "0a:18:d6:53:73:dc",
//         "signal_level": -74.5,
//         "channel": "1"
//     },
//     {
//         "ssid": "Chobey",
//         "mac": "c8:d7:19:3b:db:ff",
//         "signal_level": -74.5,
//         "channel": "2"
//     },
//     {
//         "ssid": "Chobey",
//         "mac": "c8:d7:19:3b:dc:00",
//         "signal_level": -81,
//         "channel": "149"
//     },
//     {
//         "ssid": "Chobey",
//         "mac": "0e:18:d6:53:73:7c",
//         "signal_level": -50.5,
//         "channel": "11"
//     },
//     {
//         "ssid": "Chobey",
//         "mac": "0e:18:d6:53:73:dc",
//         "signal_level": -73.5,
//         "channel": "1"
//     },
//     {
//         "ssid": "cjnc225",
//         "mac": "40:4a:03:eb:70:20",
//         "signal_level": -85,
//         "channel": "11"
//     }
// ]
