(function() {
    'use strict';

    angular
        .module('app')
        .controller('PetsController', PetsController);

    PetsController.$inject = ['battleFactory', '$ngBootbox', 'petFactory', '$stateParams', 'authFactory', 'ownerFactory','categoryFactory'];

    function PetsController(battleFactory, $ngBootbox, petFactory, $stateParams, authFactory, ownerFactory,categoryFactory) {
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

        function addBattle(battle) {}
        battleFactory.addBattle({
            //pet1Id: $stateParams.challengePetId,
            //pet2Id: 0  get from selected pet
        })
            .then(function(data) {
                console.log(vm.battles);
            });


    }
})();
