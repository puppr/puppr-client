(function() {
    'use strict';

    angular
        .module('app')
        .controller('NewDogController', NewDogController);

    NewDogController.$inject = ['petFactory', 'breedFactory', '$ngBootbox', '$stateParams', '$state', 'authFactory', '$timeout', '$mdDialog'];

    function NewDogController(petFactory, breedFactory, $ngBootbox, $stateParams, $state, authFactory, $timeout, $mdDialog) {
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
            if (vm.selectedBreed === undefined || vm.name === "" || vm.name === null || vm.birthday === undefined || vm.food === "" || vm.food === null || vm.toy === "" || vm.toy === null || vm.activity === "" || vm.activity === null) {
                $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Sorry, an error has occurred')
                    .textContent("Please make sure all fields have been filled out before continuing")
                    .ok('Got it!')
                );
            } else {
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
            }

        };



    }

})();
