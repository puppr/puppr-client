(function() {
    'use strict';

    angular
        .module('app')
        .controller('PetsController', PetsController);

    PetsController.$inject = ['$timeout', '$state', 'battleFactory', '$ngBootbox', 'petFactory', '$stateParams', 'authFactory', 'ownerFactory', 'categoryFactory', 'moment'];

    function PetsController($timeout, $state, battleFactory, $ngBootbox, petFactory, $stateParams, authFactory, ownerFactory, categoryFactory, moment) {
        var vm = this;
        vm.owners = [];
        activate();

        vm.challenger = function activate(pets) {
            petFactory.getPetById(pets).then(
                function(pet) {
                    vm.pet= pet;
                    console.log(vm.pet);
                },
                function(error) {
                    console.log("error!");
                }
            );
        };
        

        function activate() {

            ownerFactory.getCurrentOwner()
                .then(function(data) {
                    vm.owners = data;
                    console.log(vm.owners);
                });
        }


        vm.getCategories = function() {
            return $timeout(function() {
                categoryFactory.getCategories().then(
                    function(categories) {
                        vm.categories = categories;
                        console.log(vm.categories);
                    },
                    function(error) {
                        console.log("error!");
                    }
                );
            }, 500);
        };


        vm.addBattle = function() {
            vm.newBattle = {
                petTwoId: vm.selectedPet,
                petOneId: $stateParams.challengePetId,
                categoryId: vm.selectedCategory,
                challengerPhoto: vm.selectedPhoto,
                startDate: moment(),
                endDate: moment().clone().add(3, 'days')
            };
            console.log(vm.newBattle);
            vm.saving = true;
            battleFactory.addBattle(vm.newBattle).then(
                function(theNewBattle) {
                    vm.saving = false;
                    vm.theNewBattle = theNewBattle;
                    $state.go('puppr.battle.clash', { battleId: vm.theNewBattle.battleId });
                    console.log(vm.theNewBattle);
                },
                function() {}
            );

        };



    }
})();
