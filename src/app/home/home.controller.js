(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['authFactory', '$ngBootbox', '$stateParams', '$mdDialog', '$state', '$scope'];

    function HomeController(authFactory, $ngBootbox, $stateParams, $mdDialog, $state, $scope) {
        var vm = this;

        if (authFactory.isAuth) {
            $state.go('puppr.profile.dashboard');
        }

        vm.register = function(isValid) {
             if (isValid && vm.checkBox === true) {
                vm.registration = {
                    "username": vm.newUsername,
                    "password": vm.newPassword,
                    "confirmPassword": vm.newConfirmPassword
                };
                vm.saving = true;
                authFactory.register(vm.registration).then(
                    function(newUser) {
                        vm.saving = false;
                        vm.newUser = newUser;
                        authFactory.login(vm.newUsername, vm.newPassword).then(
                            function() {
                                $state.go('puppr.new.owner', { ownerId: vm.newUser });
                            }
                        );
                    },
                    function(response) {
                        $mdDialog.show(
                            $mdDialog.alert()
                            .clickOutsideToClose(true)
                            .title('Sorry, an error has occurred')
                            .textContent(response.data.modelState[''][0])
                            .ok('Got it!')
                        );
                    }
                );
            } else {
                $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Oops!')
                    .textContent('There are errors in your form.')
                    .ok('Got it!')
                );
            }
        };

        vm.login = function() {
            authFactory.login(vm.username, vm.password).then(
                function(response) {
                    $state.go('puppr.profile.dashboard', { ownerId: vm.newUser });
                },
                function(response) {
                    $mdDialog.show(
                        $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Oh no!')
                        .textContent(response.data.error_description)
                        .ok('Got it!')
                    );
                }
            );
        };


    }

})();
