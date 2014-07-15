var formidable = require('formidable');
var util 	   = require('util');
var fs 		   = require('fs');
var path 	   = require('path');

module.exports.getImages = function(req, res) {
	res.json([{"name" : "I like this"}]);
}

module.exports.upload = function(req, res) {
	 var form = new formidable.IncomingForm();
	 	 form.uploadDir = __dirname;
		 form.parse(req, function(err, fields, files) {
	      res.writeHead(200, {'content-type': 'text/plain'});
	      res.write('received upload:\n\n');
	      res.end(util.inspect({fields: fields, files: files}));
	    });
}

module.exports.testupload = function(req, res) {
	
		var form = new formidable.IncomingForm();
		 	form.type = 'multipart';
		 	form.multiples = true;
	// Parse file.
  form.parse(req, function(err, fields, files) {
  	console.log(files);
  	if(files.fileToUpload){		
			
			// Read file.			
			fs.readFile(files.fileToUpload.path, function(err, data){

		  	// Save file.
				fs.writeFile(path.join(__dirname, 'bin')+ 
					files.fileToUpload.name, 
					data, 
					'utf8', 
					function (err) {
						if (err){
							// throw err;
							res.writeHead(200, {'content-type': 'text/plain'});
							res.write(JSON.stringify({
								isSucessful: false,
								message: 'Something went wrong!'					
							}));
							res.end();
						} else {
							// Sucess.
							res.writeHead(200, {'content-type': 'text/plain'});
							res.write(JSON.stringify({
								isSucessful: true,
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