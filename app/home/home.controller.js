(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['petFactory', '$ngBootbox'];

    function HomeController(petFactory, $ngBootbox) {
        var vm = this;

        activate();

        function activate() {
            petFactory.getPets().then(
                function(pets) {
                    vm.pets = pets;
                    console.log(vm.pets);
                   
                },
                function(error) {}
            );
        }


    }

})();