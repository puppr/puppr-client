(function() {
    'use strict';

    angular
        .module('app')
        .controller('ClashController', ClashController);

    ClashController.$inject = ['battleFactory', '$ngBootbox','petFactory','$stateParams','authFactory','ownerFactory'];

    function ClashController(battleFactory, $ngBootbox,petFactory,$stateParams,authFactory,ownerFactory) {
        var vm = this;
        
        activate1();
        
        function activate1(){
          battleFactory.getBattleById($stateParams.battleId)
           .then(function(battle){
           vm.currentBattle=battle;
           console.log(vm.currentBattle);
           });
        }


    }

})();