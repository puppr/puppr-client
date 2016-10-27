(function() {
    'use strict';

    angular
        .module('app')
        .controller('ClashController', ClashController);

    ClashController.$inject = ['$mdDialog', 'battleVoteFactory', 'battleFactory', '$ngBootbox', 'petFactory', '$stateParams', 'authFactory', 'ownerFactory', 'localStorageService', 'moment'];

    function ClashController($mdDialog, battleVoteFactory, battleFactory, $ngBootbox, petFactory, $stateParams, authFactory, ownerFactory, localStorageService, moment) {
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

 // function activate2(){
 //        if (moment(vm.currentBattle.endDate).isBefore(moment())) {
 //                battleVoteFactory.getBattleVoteById($stateParams.battleId)
 //                .then(function)
                
 //            } else{
 //                return;

 //            }

    
 //        }

 // XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
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
                $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Uh Oh')
                    .textContent("This battle is no longer active, sorry!")
                    .ok('Got it!')
                );
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
                $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Oops')
                    .textContent("You've already voted on this battle!")
                    .ok('Got it!')
                );
            }
        };


        vm.vote2 = function() {
            if (moment(vm.currentBattle.endDate).isBefore(moment())) {
                $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Uh-Oh')
                    .textContent("This battle is no longer active, sorry!")
                    .ok('Got it!')
                );
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
                $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Oops')
                    .textContent("You've already voted on this battle")
                    .ok('Got it!')
                );
            }
        };








    }

})();
