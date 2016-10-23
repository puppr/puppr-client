(function() {
    'use strict';

    angular
        .module('app')
        .controller('NewOwnerController', NewOwnerController);

    NewOwnerController.$inject = ['ownerFactory', 'authFactory', '$ngBootbox', '$stateParams', '$state', '$mdDialog'];

    function NewOwnerController(ownerFactory, authFactory, $ngBootbox, $stateParams, $state, $mdDialog) {
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
            if (vm.owner.firstName === "" || vm.owner.firstName === null || vm.owner.lastName === "" || vm.owner.lastName === null || vm.owner.biography === "" || vm.owner.biography === null) {
                $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Sorry, an error has occurred')
                    .textContent("Please make sure all fields have been filled out before continuing")
                    .ok('Got it!')
                );
            } else {
                ownerFactory.editOwner(vm.currentOwnerId, owner).then(
                    function(success) {
                        console.log("success!");
                        $state.go('puppr.new.dog', { ownerId: vm.currentOwnerId });
                    },
                    function(error) {
                        console.log("error!");
                    }
                );
            }

        };


    }

})();
