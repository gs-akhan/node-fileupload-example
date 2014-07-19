var formidable = require('formidable');
var util 	   = require('util');
var fs 		   = require('fs');
var path 	   = require('path');
var config 	   = require('../config');

module.exports.getImages = function(req, res) {
	//Query all the images and send them back as a Collection
	
	fs.readdir(path.join(config.rootPath,"uploaded_images"), function(err, files) {
		files.forEach(function(f) {
			var stat = fs.stat(path.join(config.rootPath,"uploaded_images", f));
			console.log(stat);
		});
		if(err) {
			console.log(err);
			res.end(err);
		}
		res.json(files);
	});

}


module.exports.upload = function(req, res) {
	
		var form = new formidable.IncomingForm();
		 	form.type = 'multipart';
		 	form.multiples = true;
	// Parse file.
  form.parse(req, function(err, fields, files) {
  	if(files.fileToUpload){		
			
			// Read file.			
			fs.readFile(files.fileToUpload.path, function(err, data){

		  	// Save file.
		  		fs.writeFile(path.join(config.rootPath, 'uploaded_images',files.fileToUpload.name.replace(/\s+/g, "")),
					data, 
					'utf8', 
					function (err) {
						if (err){
							// throw err;
							res.writeHead(200, {'content-type': 'text/plain'});
							res.write(JSON.stringify({
								result: false,
								message: 'Something went wrong!'					
							}));
							res.end();
						} else {
							// Sucess.
							res.writeHead(200, {'content-type': 'text/plain'});
							res.write(JSON.stringify({
								result: true,
								message: 'File was saved!'
							}));
							res.end();
						}
				});
			});
		} else {
			res.writeHead(200, {'content-type': 'text/plain'});
			res.write(JSON.stringify({
				isSucessful: false,
				message: 'Did not receive any file!'					
			}));
			res.end();
		}
  });
		
}
/**
* API to delete the file
* @Param : File
**/

module.exports.delete = function(fileName){

	fs.unlink(path.join(path.rootPath,"uploaded_images", fileName), function(err) {
		if(err) {
			res.json({
				result : false,
				err : err
			})
		}
		else {
			res.json({
				result : true,
				err : null
			});
		}

	})
}

