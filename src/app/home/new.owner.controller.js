(function() {
    'use strict';

    angular
        .module('app')
        .controller('NewOwnerController', NewOwnerController);

    NewOwnerController.$inject = ['ownerFactory', '$ngBootbox', '$stateParams', '$state'];

    function NewOwnerController(ownerFactory, $ngBootbox, $stateParams, $state) {
        var vm = this;

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
            ownerFactory.editOwner(vm.owner.id, owner).then(
                function(success) {
                    console.log("success!");
                    console.log(vm.owner);
                    $state.go('puppr.new.dog', { ownerId: vm.owner.id });
                },
                function(error) {
                    console.log("error!");
                }
            );

        };


    }

})();