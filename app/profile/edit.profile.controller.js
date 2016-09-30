(function() {
    'use strict';

    angular
        .module('app')
        .controller('EditController', EditController);

    EditController.$inject = ['petFactory', '$ngBootbox'];

    function EditController(petFactory, $ngBootbox) {
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