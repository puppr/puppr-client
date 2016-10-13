(function() {
    'use strict';

    angular
        .module('app')
        .controller('HomeNavbarController', HomeNavbarController);

    HomeNavbarController.$inject = [];

    /* @ngInject */
    function HomeNavbarController() {
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
    }
})();
