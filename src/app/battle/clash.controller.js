(function() {
    'use strict';

    angular
        .module('app')
        .controller('ClashController', ClashController);

    ClashController.$inject = ['battleFactory', '$ngBootbox','petFactory','$stateParams'];

    function ClashController(battleFactory, $ngBootbox,petFactory,$stateParams) {
        var vm = this;
        vm.petIdOne=currentOwnerId;
        console.log(vm.petIdOne);
        activate();

        function activate() {
           return battleFactory.getBattles().then(
                function(data) {
                    vm.battles = data;
                    console.log(vm.battles);
                   
                },
                function(error) {}
            );
        }


    }

})();