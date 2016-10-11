(function() {
    'use strict';

    angular
        .module('app')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['ownerFactory', 'petFactory', '$ngBootbox', '$stateParams', 'authFactory'];

    function DashboardController(ownerFactory, petFactory, $ngBootbox, $stateParams, authFactory) {
        var vm = this;
        vm.currentOwnerId = authFactory.ownerId;


        function activate(id) {
            ownerFactory.getCurrentOwner().then(
                function(owner) {
                    vm.owner = owner;
                    console.log(vm.owner);
                },
                function(error) {
                    console.log("error!");
                }
            );
        }

        activate(vm.currentOwnerId);

        vm.logout = function() {
            authFactory.logout();
            $state.go('puppr.home');
        };

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
