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

        function deletePhoto(photo) {
            var deferred = $q.defer();

            //communicating with the api
            $http.delete(apiUrl + '/petphotoes/' + photo.photoId).then(
                function(response) {
                    toastr.success('The photo was successfully removed from the database');
                    deferred.resolve(response.data);
                },
                function(err) {
                    toastr.error('Oh no! An error has occurred. Please try again.');
                    deferred.reject(err);
                }
            );

            //returns the array
            return deferred.promise;
        }
    }
})();