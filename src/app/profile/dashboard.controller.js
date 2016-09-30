(function() {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['petFactory', '$ngBootbox'];

    function DashboardController(petFactory, $ngBootbox) {
        var vm = this;

        activate();

        function activate(id) {
            petFactory.getPetById(id).then(
                function(pet) {
                    vm.pet = pet;
                    console.log(vm.pet);      
                },
                function(error) {}
            );
        }


    }

})();