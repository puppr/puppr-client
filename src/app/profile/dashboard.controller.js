(function() {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['ownerFactory', 'petFactory', '$ngBootbox', '$stateParams', 'authFactory', '$state'];

    function DashboardController(ownerFactory, petFactory, $ngBootbox, $stateParams, authFactory, $state) {
        var vm = this;
        vm.currentOwnerId = authFactory.ownerId;


        function activate(id) {
            ownerFactory.getCurrentOwner().then(
                function(owner) {
                    vm.owner = owner;
                    console.log(vm.owner);
                    console.log(vm.owner.pets[0].petPhotos.length);
                },
                function(error) {
                    console.log("error!");
                }
            );
        }



        activate(vm.currentOwnerId);

    }
})();






// return Ok(new
//             {
//                 pet.PetId,
//                 pet.BreedId,
//                 pet.Name,
//                 pet.DateOfBirth,
//                 pet.DogFood,
//                 pet.Toy,
//                 pet.Activity,
//                 pet.Owner,
//                 pet.Breed,
//                 pet.Battles,
//                 pet.PetPhotos
//             });
