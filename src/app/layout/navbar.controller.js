(function() {
    'use strict';

    angular
        .module('app')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['authFactory', '$state'];

    /* @ngInject */
    function NavbarController(authFactory, $state) {
        var vm = this;

        function imageSelection() {

            vm.images = [{
                "image": "http://i.imgur.com/RcoCxvS.png"
            }, {
                "image": "http://i.imgur.com/SyChK4B.png"
            }, {
                "image": "http://i.imgur.com/bAX1SQO.png"
            }, {
                "image": "http://i.imgur.com/Qrbwqgk.png"
            }];

            var index = Math.floor(Math.random() * vm.images.length);

            vm.selection = vm.images[index];

        }

        imageSelection();

        vm.logout = function() {
            authFactory.logout();
            $state.go('welcome.home');
        };
    }
})();