(function() {
    'use strict';

    angular
        .module('app')
        .factory('petPhotoFactory', petPhotoFactory);

    petPhotoFactory.$inject = ['$http', '$q', 'apiUrl'];

    function petPhotoFactory($http, $q, apiUrl) {
        var service = {
            addPhoto: addPhoto
        };
        return service;


        function addPhoto(photo) {
        	var defer = $q.defer();
        	
        	$http.post(apiUrl + '/petphotoes',  photo).then(
        	    function(response) {
        	        defer.resolve(response.data);
        	    },
        	    function(error) {
        	        toastr.error('Oh no! An error has occurred. Please try again.');
        	        defer.reject(error);
        	    }
        	);
        	
        	return defer.promise;
        }
    }
})();