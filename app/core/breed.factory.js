(function() {
    'use strict';

    angular
        .module('app')
        .factory('breedFactory', breedFactory);

    //injecting parameters to the factory
    breedFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    function breedFactory($http, $q, toastr, apiUrl) {
        var service = {
            getBreeds: getBreeds,
            getBreedById: getBreedById,
            addBreed: addBreed,
            editBreed: editBreed,
            deleteBreed: deleteBreed
        };

        return service;

        function getBreeds() {
            var deferred = $q.defer();

            //communicating with the api
            $http.get(apiUrl + '/breeds/').then(
                function(response) {
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

         function getBreedById(id) {
            var deferred = $q.defer();

            //communicating with the api
            $http.get(apiUrl + '/breeds/' + id).then(
                function(response) {
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

        function addBreed(breed) {
            var deferred = $q.defer();

            //communicating with the api
            $http.post(apiUrl + '/breeds/', breed).then(
                function(response) {
                    toastr.success('The breed was successfully added to the database.');
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


        function editBreed(breed) {
            var deferred = $q.defer();

            //communicating with the api
            $http.put(apiUrl + '/breeds/' + breed.breedId, breed).then(
                function(response) {
                    toastr.success("This breed's information has been successfully edited.");
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

        function deleteBreed(breed) {
            var deferred = $q.defer();

            //communicating with the api
            $http.delete(apiUrl + '/breeds/' + breed.breedId).then(
                function(response) {
                    toastr.success('This breed was successfully removed from the database.');
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