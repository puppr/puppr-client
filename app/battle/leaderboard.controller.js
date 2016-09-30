(function() {
    'use strict';

    angular
        .module('app')
        .controller('LeaderboardController', LeaderboardController);

    LeaderboardController.$inject = ['battleFactory', '$ngBootbox'];

    function LeaderboardController(battleFactory, $ngBootbox) {
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