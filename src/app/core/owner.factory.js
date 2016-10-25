(function() {
    'use strict';

    angular
        .module('app')
        .factory('ownerFactory', ownerFactory);

    //injecting parameters to the factory
    ownerFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    function ownerFactory($http, $q, toastr, apiUrl) {
        var service = {
            getCurrentOwner: getCurrentOwner,
            getOwnerById: getOwnerById,
            editOwner: editOwner,
            getAllOwners: getAllOwners
        };

        return service;

        function getAllOwners() {
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

        function getCurrentOwner() {
            var deferred = $q.defer();

            //communicating with the api
            $http.get(apiUrl + '/owners/me').then(
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



        function editOwner(ownerId, owner) {
            var deferred = $q.defer();

            //communicating with the api
            $http.put(apiUrl + '/owners/' + ownerId, owner).then(
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

    }
})();
