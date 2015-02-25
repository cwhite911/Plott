/**
 * TracksController
 *
 * @description :: Server-side logic for managing tracks
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */


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
	signalToPoint: function (req, res){
		var d1 = signalToDistace(80, 400),
				d2 = signalToDistace(80, 400),
				d3 = signalToDistace(80, 400);
	}
};
