(function() {
    'use strict';

    angular
        .module('app')
        .factory('ownerFactory', ownerFactory);

    //injecting parameters to the factory
    ownerFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    function ownerFactory($http, $q, toastr, apiUrl) {
        var service = {
            getOwners: getOwners,
            getOwnerById: getOwnerById,
            addOwner: addOwner,
            editOwner: editOwner,
            deleteOwner: deleteOwner
        };

        return service;

        function getOwners() {
            var deferred = $q.defer();

            //communicating with the api
            $http.get(apiUrl + '/owners/').then(
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

        function getOwnerById(id) {
            var deferred = $q.defer();

            //communicating with the api
            $http.get(apiUrl + '/owners/' + id).then(
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

        function addOwner(owner) {
            var deferred = $q.defer();

            //communicating with the api
            $http.post(apiUrl + '/owners/', owner).then(
                function(response) {
                    // toastr.success('The owner was successfully added to the database.');
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


        function editOwner(owner) {
            var deferred = $q.defer();

            //communicating with the api
            $http.put(apiUrl + '/owners/' + owner.ownerId, owner).then(
                function(response) {
                    toastr.success("This owner's information has been successfully edited.");
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

        function deleteOwner(owner) {
            var deferred = $q.defer();

            //communicating with the api
            $http.delete(apiUrl + '/owners/' + owner.ownerId).then(
                function(response) {
                    toastr.success('This owner was successfully removed from the database.');
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
