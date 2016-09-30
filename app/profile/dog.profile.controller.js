(function() {
    'use strict';

    angular
        .module('app')
        .controller('DogController', DogController);

    DogController.$inject = ['petFactory', '$ngBootbox'];

    function DogController(petFactory, $ngBootbox) {
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