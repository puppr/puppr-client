(function() {
    'use strict';

    angular
        .module('app')
        .controller('ClashController', ClashController);

    ClashController.$inject = ['battleVoteFactory', 'battleFactory', '$ngBootbox', 'petFactory', '$stateParams', 'authFactory', 'ownerFactory', 'localStorageService',];

    function ClashController(battleVoteFactory, battleFactory, $ngBootbox, petFactory, $stateParams, authFactory, ownerFactory, localStorageService) {
        var vm = this;
        vm.vote = {};
        vm.vote1 = {};
        activate1();
        

        var votedBattles = localStorageService.get('votedBattles') || []; // this should be an array

        function activate1() {
            battleFactory.getBattleById($stateParams.battleId)
                .then(function(battle) {
                    vm.currentBattle = battle;
                    console.log(vm.currentBattle);
                });
        }





        vm.vote1 = function() {
            if (votedBattles.indexOf($stateParams.battleId) === -1) {
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
            if (votedBattles.indexOf($stateParams.battleId) === -1) {
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
