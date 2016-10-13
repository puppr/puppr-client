(function() {
    'use strict';

    angular
        .module('app')
        .controller('NewOwnerController', NewOwnerController);

    NewOwnerController.$inject = ['ownerFactory', 'authFactory', '$ngBootbox', '$stateParams', '$state'];

    function NewOwnerController(ownerFactory, authFactory, $ngBootbox, $stateParams, $state) {
        var vm = this;

        vm.currentOwnerId = authFactory.ownerId;

        function activate(id) {
            ownerFactory.getCurrentOwner().then(
                function(owner) {
                    vm.owner = owner;
                    console.log(vm.owner);
                },
                function(error) {
                    console.log("error!");
                }
            );
        }

        activate();


        vm.editOwner = function(owner) {
            ownerFactory.editOwner(vm.currentOwnerId, owner).then(
                function(success) {
                    console.log("success!");
                    $state.go('puppr.new.dog', { ownerId: vm.currentOwnerId });
                },
                function(error) {
                    console.log("error!");
                }
            );

        };


    }

})();