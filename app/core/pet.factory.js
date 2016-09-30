(function() {
    'use strict';

    angular
        .module('app')
        .factory('petFactory', petFactory);

    //injecting parameters to the factory
    petFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    function petFactory($http, $q, toastr, apiUrl) {
        var service = {
            getPets: getPets,
            getPetById: getPetById,
            addPet: addPet,
            editPet: editPet,
            deletePet: deletePet
        };

        return service;

        function getPets() {
            var deferred = $q.defer();

            //communicating with the api
            $http.get(apiUrl + '/pets/').then(
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

        function getPetById(id) {
            var deferred = $q.defer();

            //communicating with the api
            $http.get(apiUrl + '/pets/' + id).then(
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

        function addPet(pet) {
            var deferred = $q.defer();

            //communicating with the api
            $http.post(apiUrl + '/pets/', pet).then(
                function(response) {
                    toastr.success('The pet was successfully added to the database.');
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


        function editPet(pet) {
            var deferred = $q.defer();

            //communicating with the api
            $http.put(apiUrl + '/pets/' + pet.petId, pet).then(
                function(response) {
                    toastr.success("This pet's information has been successfully edited.");
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

        function deletePet(pet) {
            var deferred = $q.defer();

            //communicating with the api
            $http.delete(apiUrl + '/pets/' + pet.petId).then(
                function(response) {
                    toastr.success('This pet was successfully removed from the database.');
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