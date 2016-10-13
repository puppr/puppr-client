(function() {
    'use strict';

    angular
        .module('app')
        .controller('ClashController', ClashController);

    ClashController.$inject = ['battleFactory', '$ngBootbox','petFactory','$stateParams','authFactory','ownerFactory'];

    function ClashController(battleFactory, $ngBootbox,petFactory,$stateParams,authFactory,ownerFactory) {
        var vm = this;
        console.log(vm.petIdOne);
        activate1($stateParams.petId);
        activate2();
        activate3();

        function activate1(id){
                    petFactory.getPetById(id).then(
                function(pet) {
                    vm.pet = pet;
                    console.log(vm.pet);      
                },
                function(error) {}
            );
        }
 

        function activate2(id) {
            ownerFactory.getCurrentOwner().then(
                function(owner) {
                    vm.owner = owner;
                    
                },
                function(error) {
                    console.log("error!");
                }
            );
        }

        

        function activate3() {
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