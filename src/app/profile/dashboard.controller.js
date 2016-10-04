(function() {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['petFactory', '$ngBootbox', '$stateParams'];

    function DashboardController(petFactory, $ngBootbox, $stateParams) {
        var vm = this;

        function activate(id) {
            petFactory.getPetById(id).then(
                function(pet) {
                    vm.pet = pet;
                    console.log(vm.pet);      
                },
                function(error) {}
            );
        }

        vm.currentPetId = $stateParams.petId;

        activate(vm.currentPetId);


    }

})();