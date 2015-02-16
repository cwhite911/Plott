/**
 * CoverageController
 *
 * @description :: Server-side logic for managing coverages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var wifiscanner = require('node-wifiscanner');


module.exports = {

	//scan local-wifi
	getWifi: function (req, res){
		var spotInfo;
		wifiscanner.scan(function(err, data){
			if (err) {
				console.log("Error : " + err);
				return;
			}
			spotInfo = {
				timeStamp: +new Date(),
				data: data
			};

			res.send(spotInfo);
		});
	}

};
