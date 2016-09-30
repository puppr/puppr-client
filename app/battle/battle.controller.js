(function() {
    'use strict';

    angular
        .module('app')
        .controller('ClashController', ClashController);

    ClashController.$inject = ['battleFactory', '$ngBootbox'];

    function ClashController(battleFactory, $ngBootbox) {
        var vm = this;

        activate();

        function activate() {
            battleFactory.getBattles().then(
                function(battles) {
                    vm.battles = battles;
                    console.log(vm.battles);
                   
                },
                function(error) {}
            );
        }


    }

})();