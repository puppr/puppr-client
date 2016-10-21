(function() {
    'use strict';

    angular
        .module('app')
        .factory('battleVoteFactory', battleVoteFactory);

    //injecting parameters to the factory
    battleVoteFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    function battleVoteFactory($http, $q, toastr, apiUrl) {
        var service = {
            getBattleVotes: getBattleVotes,
            getBattleVoteById: getBattleVoteById,
            addBattleVote: addBattleVote,
        };

        return service;

        function getBattleVotes() {
            var deferred = $q.defer();

            //communicating with the api
            $http.get(apiUrl + '/battlevotes/').then(
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

        function getBattleVoteById(id) {
            var deferred = $q.defer();

            //communicating with the api
            $http.get(apiUrl + '/battlevotes/' + id).then(
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

        function addBattleVote(battlevote) {
            var deferred = $q.defer();

            //communicating with the api
            $http.post(apiUrl + '/battlevotes/', battlevote).then(
                function(response) {
                    toastr.success('Your vote has been succesfully added.');
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
