(function() {
    'use strict';

    angular
        .module('app')
        .controller('ClashController', ClashController);

    ClashController.$inject = ['battleVoteFactory', 'battleFactory', '$ngBootbox', 'petFactory', '$stateParams', 'authFactory', 'ownerFactory', 'localStorageService', 'moment'];

    function ClashController(battleVoteFactory, battleFactory, $ngBootbox, petFactory, $stateParams, authFactory, ownerFactory, localStorageService, moment) {
        var vm = this;
        vm.vote = {};
        vm.vote1 = {};
        vm.endDate = {};
        vm.now = moment();
        activate1();

        var votedBattles = localStorageService.get('votedBattles') || []; // this should be an array

        function activate1() {
            battleFactory.getBattleById($stateParams.battleId)
                .then(function(battle) {
                    vm.currentBattle = battle;
                    console.log(vm.currentBattle);
                });
        }
        // vm.activate2 = function() {
        //     if (moment(vm.currentBattle.endDate).isBefore(moment())) {
        //         battleVoteFactory.getBattleVotes($stateParams.battleId, )
        //         .then(function())
        //         }else {
        //             return;

        //         }
            
        // };

        //USE BATTLE ID 31 AS EXAMPLE IT IS ALREADY DISABLED

        vm.vote1 = function() {

            if (moment(vm.currentBattle.endDate).isBefore(moment())) {
                alert('This battle is no longer active!');
                return;
            } else if (votedBattles.indexOf($stateParams.battleId) === -1) {
                vm.currentBattle.challenger.votes++;

                vm.newVote = {
                    battleId: $stateParams.battleId,
                    petId: vm.currentBattle.challenger.petId,
                };
                vm.saving = true;
                battleVoteFactory.addBattleVote(vm.newVote).then(
                    function(theNewVote) {
                        vm.saving = false;
                        vm.theNewVote = theNewVote;
                        console.log(theNewVote);
                        votedBattles.push($stateParams.battleId);
                        localStorageService.set('votedBattles', votedBattles);
                    }
                );
            } else {
                alert('You already voted');
            }
        };


        vm.vote2 = function() {
            if (moment(vm.currentBattle.endDate).isBefore(moment())) {
                alert('This battle is no longer active!');
                return;
            } else if (votedBattles.indexOf($stateParams.battleId) === -1) {
                vm.currentBattle.defender.votes++;

                vm.newVote = {
                    battleId: $stateParams.battleId,
                    petId: vm.currentBattle.defender.petId,
                };
                vm.saving = true;
                battleVoteFactory.addBattleVote(vm.newVote).then(
                    function(theNewVote) {
                        vm.saving = false;
                        vm.theNewVote = theNewVote;
                        console.log(theNewVote);
                        votedBattles.push($stateParams.battleId);
                        localStorageService.set('votedBattles', votedBattles);
                    },
                    localStorageService.set('votedBattles', $stateParams.battleId)
                );
            } else {
                alert('You already voted');
            }
        };








    }

})();
