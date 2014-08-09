(function() {
	"use strict";
	var photoApp = window.angular.module("photoApp", []);

	/**
	* Create a servie to hold all the images.
	**/
		
	photoApp.factory('AllImages', function() {
		var photosList = [];
		return {
			addphoto : function(imgName) {
				photosList.push(imgName)
			},

			photos : function() {
				return photosList;
			}
		}
	});

	photoApp.controller("ListCtrl", function ($scope, $http, AllImages) {
		/*$scope.$watch(function() {
		    return AllImages.photos;
		}, function(newVal, oldVal) {
		    alert('changes')
		});*/

		$http({method : "GET", url : "/api/imagelist"})
			 .success(function(data) {
			 	for(var k =0; k < data.length; k++) {
			 		AllImages.addphoto(data[k]);
			 	}

			 	$scope.photos = AllImages.photos;
			 });
		/**
		* Invoked when user clicks the image. 
		**/
		$scope.navigate = function($event) {
			var src = $($event.target).attr('src');
			var win = window.open(src, '_blank');
				 win.focus();
		};
		
	});

	photoApp.controller("UploadCtrl", function($scope, $http, $element, AllImages) {

		$scope.filesToUpload = [];

		/**
		* This methos fires when files are selected via File explore,
		* It lists all the files, the user wants to upload, It then stores these files into
		* $scope.fileToUpload[] array
		* and when the user clicks "upload" the files from $scope.filesToUpload are parceled to the server
		**/
		
		$scope.fileLoaded = function() {

			var files   	  = $element.find("#fileBox").get(0).files;
			for(var i = 0; i < files.length; i++) {
				(function(idx) {
					var file = files[idx];
					var imageType = /image.*/;
					var reader 	  = new FileReader();
					if (file.type.match(imageType)) {
						reader.onload = function() {
							var img = $('<img />', {
									src : reader.result,
										class : "imageThumb"
									});
								$element.find(".tempHolder").append(img);
							}

						reader.readAsDataURL(file);
						$scope.filesToUpload.push(file);
					}
					else {
						console.error("File not Supported")
					}
				})(i);
			
			
			}
		};

		
		/**
		* This method is used to dispatch all the selected files to the server.
		* It loops through the files in $Scope.filesToUpload and then dispatches each files to\
		* the /upload route.
		**/
		
		$scope.uploadFiles = function() {
			var totalFiles = $scope.filesToUpload.length,
				uploaded   = 0; 

			try {
					
					
					for(var i = 0; i < $scope.filesToUpload.length; i++) {
						(function(idx) {

							var formData = new FormData();
								formData.append("fileToUpload", $scope.filesToUpload[idx]);
								$.ajax({
										cache: false,
										contentType: false,
										processData: false,
										type: "POST",
										url: "/upload",
										data: formData
										
								}).success(function(data) {
										//The below line removes the file from $scope.filesToUpload
										//If u dont do this, next time u upload another files, this file gets uploaded again	
										uploaded ++;
										if(uploaded === totalFiles) {
											$scope.filesToUpload = [];
										}
										data = JSON.parse(data);
										AllImages.addphoto(data.data.location);
										$scope.$apply();
										
								}).fail(function() {
										alert('failed');
								});
							})(i);
					}
					
			}	
			catch(e) {
					console.error(e.message);
					
			}
		};

	});
})();
