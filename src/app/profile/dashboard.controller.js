(function() {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['petFactory', '$ngBootbox','$stateParams'];

    function DashboardController(petFactory, $ngBootbox,$stateParams) {
        var vm = this;
          vm.pet={};
        activate();

        function activate() {
             if ($stateParams.petId) {
                petFactory.getPetById($stateParams.petId)
                    .then(function(data) {
                        vm.pet = data;
                        console.log(vm.pet);
                    });
            }
        }
    }
})();