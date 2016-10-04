(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['ownerFactory', '$ngBootbox', '$stateParams', '$state'];

    function HomeController(ownerFactory, $ngBootbox, $stateParams, $state) {
        var vm = this;

        function activate() {
            ownerFactory.getOwners().then(
                function(owners) {
                    vm.owners = owners;
                    console.log(vm.owners);
                },
                function(error) {}
            );
        }

        activate();

        vm.addUser = function() {
            if (vm.newPasswordOne != vm.newPasswordTwo) {
                alert('your passwords do not match');
            } else {
                vm.newUser = {
                    "email": vm.newEmail,
                    "password": vm.newPasswordOne
                };
                vm.saving = true;
                ownerFactory.addOwner(vm.newUser).then(
                    function(theNewUser) {
                        vm.saving = false;
                        vm.theNewUser = theNewUser;
                        console.log(vm.theNewUser);
                        vm.owners.push(theNewUser);
                        $state.go('puppr.new.owner', { ownerId: vm.theNewUser.ownerId });
                    },
                    function() {}
                );
            }
        };

        // vm.verifyUser = function() {
        //     var o = 0;
        //     for (o = 0; o < vm.owners.length; o++) {
        //         if (vm.email != vm.password) {
        //             alert('incorrect password or email');
        //         } else if (vm.email === vm.password) {
        //             vm.loggedIn = {
        //                 "email": vm.email,
        //                 "password": vm.password
        //             };
        //             $state.go('puppr.profile.dashboard', { ownerId: vm.loggedIn.ownerId });
        //         }
        //     }

        // };


    }

})();
