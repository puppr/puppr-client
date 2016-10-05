(function() {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['ownerFactory', '$ngBootbox','$stateParams'];

    function DashboardController(ownerFactory, $ngBootbox, $stateParams) {
        var vm = this;
        vm.currentOwnerId = $stateParams.ownerId;
        

        function activate(id) {
            ownerFactory.getOwnerById(id).then(
                function(owner) {
                    vm.owner = owner;
                    console.log(vm.owner);
                },
                function(error) {
                    console.log("error!");
                }
            );
        }

        activate(vm.currentOwnerId);

    }
})();