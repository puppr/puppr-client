(function() {
    'use strict';

    angular
        .module('app')
        .controller('OwnerController', OwnerController);

    OwnerController.$inject = ['ownerFactory', '$ngBootbox'];

    function OwnerController(ownerFactory, $ngBootbox) {
        var vm = this;

        activate();

        function activate() {
            ownerFactory.getOwnerById().then(
                function(owner) {
                    vm.owner = owner;
                    console.log(vm.owner);      
                },
                function(error) {}
            );
        }


    }

})();