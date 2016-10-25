(function() {
    'use strict';

    angular
        .module('app')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$state','$stateParams','battleFactory', '$ngBootbox','petFactory','ownerFactory'];

    function SearchController($state,$stateParams,battleFactory, $ngBootbox, petFactory, ownerFactory) {
        var vm = this;

        getPets();

        function getPets(){
            petFactory.getPets().then(
                function(pets) {
                    
                    console.log(vm.pets);
                   
                },
                function(error) {}
            );
        }


    }

})();