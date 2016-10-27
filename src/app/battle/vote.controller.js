(function() {
    'use strict';

    angular
        .module('app')
        .controller('VoteController', VoteController);

    VoteController.$inject = ['battleFactory', '$ngBootbox','petFactory'];

    function VoteController(battleFactory, $ngBootbox,petFactory) {
        var vm = this;

        activate();
        activate2();

        function activate() {
            battleFactory.getBattles().then(
                function(battles) {
                    vm.battles = battles;
                    console.log(vm.battles);
                   
                },
                function(error) {}
            );
        }
        // function activate2(){
        // if (moment(vm.currentBattle.endDate).isBefore(moment())) {
                
        //         .then(function)
                
        //     } else{
        //         return;

        //     }

    
        // }


    }

})();