(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['authFactory', '$ngBootbox', '$stateParams', '$state'];

    function HomeController(authFactory, $ngBootbox, $stateParams, $state) {
        var vm = this;

        if(authFactory.isAuth) {
            $state.go('puppr.profile.dashboard');
        }

        function register() {
            authFactory.register(vm.registration).then(
                function(response) {
                    alert('Registration successful! Please login.');
                    $state.go('login');
                },
                function(response) {
                    alert('Registration form invalid');
                }
            );
        }

        vm.register = function() {
            if (vm.newPassword != vm.newConfirmPassword) {
                alert('your passwords do not match');
            } else {
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
                                $state.go('puppr.new.owner', { ownerId: vm.newUser});
                            }
                        );
                    },
                    function() {}
                );
            }
        };

        vm.login = function() {
            authFactory.login(vm.username, vm.password).then(
                function(response) {
                    $state.go('puppr.profile.dashboard', { ownerId: vm.newUser});
                },
                function(error) {
                    alert(error.error_description);
                }
            );
        };


    }

})();
