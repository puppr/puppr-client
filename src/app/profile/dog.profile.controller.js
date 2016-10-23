(function() {
    'use strict';

    angular
        .module('app')
        .controller('DogController', DogController);
        // .filter('ageFilter', ageFilter);

    DogController.$inject = ['petFactory', 'authFactory', '$ngBootbox', '$stateParams', '$state'];

    function DogController(petFactory, authFactory, $ngBootbox, $stateParams, $state) {
        var vm = this;
        vm.pet = {};

        activate();   

        vm.currentOwnerId = authFactory.ownerId;

        console.log(vm.currentOwnerId);

        // function ageFilter() {
        //     function calculateAge(birthday) { // birthday is a date
        //         var date = new Date(birthday);
        //         var ageDifMs = Date.now() - date.getTime();
        //         var ageDate = new Date(ageDifMs); // miliseconds from epoch
        //         return Math.abs(ageDate.getUTCFullYear() - 1970);
        //     }

        //     return function(birthdate) {
        //         return calculateAge(birthdate);
        //     };
        // }

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
