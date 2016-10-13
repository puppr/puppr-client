(function() {
    'use strict';

    angular
        .module('app')
        .controller('DogController', DogController)
        .filter('ageFilter', ageFilter);

    DogController.$inject = ['petFactory', '$ngBootbox', '$stateParams', '$state'];

    function ageFilter() {
        function calculateAge(birthday) { // birthday is a date
            var date = new Date(birthday);
            var ageDifMs = Date.now() - date.getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }

        return function(birthdate) {
            return calculateAge(birthdate);
        };
    }

    function DogController(petFactory, $ngBootbox, $stateParams, $state) {
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
