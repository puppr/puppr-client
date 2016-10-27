(function() {
    'use strict';

    angular
        .module('app')
        .controller('OwnerController', OwnerController);

    OwnerController.$inject = ['ownerFactory', 'authFactory', '$ngBootbox', '$stateParams', '$state'];

    function OwnerController(ownerFactory, authFactory, $ngBootbox, $stateParams, $state) {
        var vm = this;
        vm.owners = [];
        vm.currentOwnerId = authFactory.ownerId;

        activate();

        function activate() {

            if (vm.currentOwnerId) {
                ownerFactory.getCurrentOwner()
                    .then(function(data) {
                        vm.owners = data;
                        console.log(vm.owners);
                    });
            } else {
                vm.owners = {};

            }


        }
    }

})();
