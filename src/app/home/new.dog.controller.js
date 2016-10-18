(function() {
    'use strict';

    angular
        .module('app')
        .controller('NewDogController', NewDogController);

    NewDogController.$inject = ['petFactory', 'breedFactory', '$ngBootbox', '$stateParams', '$state', 'authFactory', '$timeout'];

    function NewDogController(petFactory, breedFactory, $ngBootbox, $stateParams, $state, authFactory, $timeout) {
        var vm = this;

        vm.currentOwnerId = authFactory.ownerId;

        vm.getBreeds = function() {
            return $timeout(function() {
                breedFactory.getBreeds().then(
                    function(breeds) {
                        vm.breeds = breeds;
                        console.log(vm.breeds);
                    },
                    function(error) {
                        console.log("error!");
                    }
                );
            }, 500);
        };

        vm.addPet = function() {
            vm.newPet = {
                "name": vm.name,
                "dateOfBirth": vm.birthday,
                "dogFood": vm.food,
                "gender": vm.gender,
                "toy": vm.toy,
                "activity": vm.activity,
                "ownerId": vm.currentOwnerId,
                "breedId": vm.selectedBreed.breedId,
            };
            console.log(vm.newPet);
            vm.saving = true;
            petFactory.addPet(vm.newPet).then(
                function(theNewPet) {
                    vm.saving = false;
                    vm.theNewPet = theNewPet;
                    console.log(vm.theNewPet);
                    $state.go('puppr.profile.dashboard', { ownerId: vm.currentOwnerId });
                },
                function() {}
            );

        };

        vm.addBattle = function() {
            vm.newBattle = {
                pet1Id: $stateParams.challengePetId,
                pet2Id: vm.selectedPet
            };
            console.log(vm.newBattle);
            // vm.saving = true;
            // battleFactory.addBattle(vm.newBattle).then(
            //     function(theNewBattle) {
            //         vm.saving = false;
            //         vm.theNewBattle = theNewBattle;
            //         console.log(vm.theNewBattle);                },
            //     function() {}
            // );

        };



    }

})();
