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
})();
