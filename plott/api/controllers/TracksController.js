/**
 * TracksController
 *
 * @description :: Server-side logic for managing tracks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var wifiscanner = require('node-wifiscanner'),
		trilateration = require('trilateration'),
		knownAPs = [
			{
				mac: '0a:18:d6:53:73:7c',
				x: -78.902439,
				y: 36.022025
			},
			{
				mac: 'c8:d7:19:3b:db:ff',
				x: -78.902483,
				y: 36.022058
			},
			{
				mac: '0a:18:d6:53:73:dc',
				x: -78.902517,
				y: 36.021989
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
	// var spotInfo;
	signalToPoint: function (req, res){

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
			var distance;
			data.forEach(function(ap){
				for (var i = 0, l = knownAPs.length; i < l; i++){
					if (ap.mac === knownAPs[i].mac){
						console.log(ap.mac);
						//Add Beacon
						trilateration.addBeacon(i, trilateration.vector(knownAPs[i].x, knownAPs[i].y));
						distance = signalToDistance(ap.signal_level, 400);
						//Setting the beacons distances
						console.log({index: i, distance: distance});
						trilateration.setDistance(i, distance);
					}
				}
			});
		});


		// Start Calculation
		var pos = trilateration.calculatePosition();

		console.log("X: " + pos.x + "; Y: " + pos.y);

				res.send(pos);
	}
};
