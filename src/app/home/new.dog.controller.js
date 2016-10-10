(function() {
    'use strict';

    angular
        .module('app')
        .controller('NewDogController', NewDogController);

    NewDogController.$inject = ['petFactory', 'breedFactory', '$ngBootbox', '$stateParams', '$state'];

    function NewDogController(petFactory, breedFactory, $ngBootbox, $stateParams, $state) {
        var vm = this;

        vm.currentOwnerId = $stateParams.ownerId;

        function activate() {
            breedFactory.getBreeds().then(
                function(breeds) {
                    vm.breeds = breeds;
                    console.log(vm.breeds);
                },
                function(error) {
                    console.log("error!");
                }
            );
        }

        activate();


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



    }

})();