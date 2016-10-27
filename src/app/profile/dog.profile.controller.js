(function() {
    'use strict';

    angular
        .module('app')
        .controller('DogController', DogController);

    DogController.$inject = ['petFactory', 'authFactory', '$ngBootbox', '$stateParams', '$state'];

    function DogController(petFactory, authFactory, $ngBootbox, $stateParams, $state) {
        var vm = this;
        vm.pet = {};

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
