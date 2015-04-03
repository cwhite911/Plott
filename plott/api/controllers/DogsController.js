/**
 * DogsController
 *
 * @description :: Server-side logic for managing dogs
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	//Upload photo of dog
	upload: function (req, res){
		req.file('file').upload({
		  dirname: require('path').resolve(sails.config.appPath, './assets/images/dogs'),
			saveAs: req.body.fileName
		},function (err, uploadedFiles) {
		  if (err) return res.negotiate(err);

		  return res.json({
		    message: uploadedFiles.length + ' file(s) uploaded successfully!',
				files: uploadedFiles
		  });
		});
	}
};
