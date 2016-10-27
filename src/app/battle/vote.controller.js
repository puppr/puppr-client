(function() {
    'use strict';

    angular
        .module('app')
        .controller('VoteController', VoteController);

    VoteController.$inject = ['battleFactory', '$ngBootbox', 'petFactory', 'moment'];

    function VoteController(battleFactory, $ngBootbox, petFactory, moment) {
        var vm = this;
        vm.isBefore = isBefore;
        vm.isAfter = isAfter;
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

        function isBefore(date) {
            return moment(moment()).isBefore(date);


        }

        function isAfter(date) {
            return (moment(date).isBefore(moment()));


        }

    }

})();
