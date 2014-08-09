(function() {
	"use strict";
	var photoApp = window.angular.module("photoApp", []);

	photoApp.controller("ListCtrl", function ($scope, $http) {
		$http({method : "GET", url : "/api/imagelist"})
			 .success(function(data) {
			 	console.log(data);
			 	$scope.imagelist = data;
			 });
	});

	photoApp.controller("UploadCtrl", function($scope, $http, $element) {

		$scope.filesToUpload = [];

		$scope.uploadFile = function() {
			alert('uplaod clicked');
		}

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
		}


		$scope.uploadFiles = function() {

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
										console.log(data);
								}).fail(function() {
										alert('failed');
								});
							})(i);
					}
					
			}	
			catch(e) {
					console.error(e.message);
					
			}
		}

	})
})();
