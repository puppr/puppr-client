(function() {
    'use strict';

    angular
        .module('app')
        .controller('PetsController', PetsController);

    PetsController.$inject = ['$state', 'battleFactory', '$ngBootbox', 'petFactory', '$stateParams', 'authFactory', 'ownerFactory', 'categoryFactory'];

    function PetsController($state, battleFactory, $ngBootbox, petFactory, $stateParams, authFactory, ownerFactory, categoryFactory) {
        var vm = this;

        vm.owners = [];
     
        activate();

        function activate() {

            ownerFactory.getCurrentOwner()
                .then(function(data) {
                    vm.owners = data;
                    console.log(vm.owners);
                });
        }

        activate1();

        function activate1() {
            return categoryFactory.getCategories()
                .then(
                    function(data) {


                        vm.categories = data;
                        console.log(data);


                    }
                );
        }

       vm.addBattle = function() {
           vm.newBattle = {
               petOneId: vm.selectedPet,
               petTwoId: $stateParams.challengePetId,
               categoryId: vm.selectedCategory
           };
           console.log(vm.newBattle);
           vm.saving = true;
           battleFactory.addBattle(vm.newBattle).then(
               function(theNewBattle) {
                   vm.saving = false;
                   vm.theNewBattle = theNewBattle;
                   $state.go('puppr.battle.clash', {battleId: vm.theNewBattle.battleId});
                   console.log(vm.theNewBattle);
               },
               function() {}
           );

       };



    }
})();
