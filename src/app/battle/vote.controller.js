(function() {
    'use strict';

    angular
        .module('app')
        .controller('VoteController', VoteController);

    VoteController.$inject = ['battleFactory', '$ngBootbox','petFactory'];

    function VoteController(battleFactory, $ngBootbox,petFactory) {
        var vm = this;

        activate();

        function activate() {
            voteFactory.getBattles().then(
                function(battles) {
                    vm.battles = battles;
                    console.log(vm.battles);
                   
                },
                function(error) {}
            );
        }


    }

})();