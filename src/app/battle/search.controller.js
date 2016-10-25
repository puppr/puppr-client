(function() {
    'use strict';

    angular
        .module('app')
        .controller('SearchController', SearchController);

    SearchController.$inject = ['$state','$stateParams','battleFactory', '$ngBootbox','petFactory','ownerFactory'];

    function SearchController($state,$stateParams,battleFactory, $ngBootbox, petFactory, ownerFactory) {
        var vm = this;
        vm.currentPage= 0;
        vm.pageSize = 20;
        getPets();

        function getPets(){
            petFactory.getPets().then(
                function(pets) {
                    vm.pets= pets;
                    console.log(vm.pets);
                   
                },
                function(error) {}
            );
        }


    }

})();