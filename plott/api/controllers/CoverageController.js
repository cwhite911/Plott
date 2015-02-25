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
	}

};
