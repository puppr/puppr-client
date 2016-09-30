(function() {
    'use strict';

    angular
        .module('app')
        .factory('battleFactory', battleFactory);

    //injecting parameters to the factory
    battleFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    function battleFactory($http, $q, toastr, apiUrl) {
        var service = {
            getBattles: getBattles,
            getBattleById: getBattleById,
            addBattle: addBattle,
            editBattle: editBattle,
            deleteBattle: deleteBattle
        };

        return service;

        function getBattles() {
            var deferred = $q.defer();

            //communicating with the api
            $http.get(apiUrl + '/battles/').then(
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

        function getBattleById(id) {
            var deferred = $q.defer();

            //communicating with the api
            $http.get(apiUrl + '/battles/' + id).then(
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

        function addBattle(battle) {
            var deferred = $q.defer();

            //communicating with the api
            $http.post(apiUrl + '/battles/', battle).then(
                function(response) {
                    toastr.success('The battle was successfully added to the database.');
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


        function editBattle(battle) {
            var deferred = $q.defer();

            //communicating with the api
            $http.put(apiUrl + '/battles/' + battle.battleId, battle).then(
                function(response) {
                    toastr.success("This battle's information has been successfully edited.");
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

        function deleteBattle(battle) {
            var deferred = $q.defer();

            //communicating with the api
            $http.delete(apiUrl + '/battles/' + batle.battleId).then(
                function(response) {
                    toastr.success('This battle was successfully removed from the database.');
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
