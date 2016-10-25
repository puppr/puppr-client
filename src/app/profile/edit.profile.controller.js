(function() {
    'use strict';

    angular
        .module('app')
        .controller('EditController', EditController);

    EditController.$inject = ['ownerFactory', 'breedFactory', 'petPhotoFactory', '$mdDialog', 'petFactory', '$ngBootbox', '$stateParams', 'authFactory', '$scope'];

    function EditController(ownerFactory, breedFactory, petPhotoFactory, $mdDialog, petFactory, $ngBootbox, $stateParams, authFactory, $scope) {
        var vm = this;
        vm.currentOwnerId = authFactory.ownerId;
        vm.onFileUploaded = onFileUploaded;

  //       $scope.myInterval = 3000;
  // $scope.noWrapSlides = false;
  // $scope.active = 0;


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

        function activateTwo() {
            breedFactory.getBreeds().then(
                function(breeds) {
                    vm.breeds = breeds;
                    console.log(vm.breeds);
                },
                function(error) {
                    console.log("error!");
                }
            );
        }

        activateTwo();



        function onFileUploaded(file, petId) {
            var a = 0;
            for (a = 0; a < vm.owner.pets.length; a++) {
                if (vm.owner.pets[a].petId === petId && vm.owner.pets[a].petPhotos.length >= 4) {
                    $mdDialog.show(
                        $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Sorry for the inconvenience')
                        .textContent("You may only upload a maximum of four photos per dog.")
                        .ok('Got it!')
                    );
                } else {
                    petPhotoFactory.addPhoto({
                        petId: petId,
                        url: file.url
                    }).then(
                        function(photo) {
                            vm.photo = photo;
                            var p = 0;
                            for (p = 0; p < vm.owner.pets.length; p++) {
                                if (vm.owner.pets[p].petId === petId) {
                                    console.log(vm.owner.pets.length);
                                    vm.owner.pets[p].petPhotos.push(vm.photo);
                                }
                            }
                        }
                    );
                }
            }
        }

        vm.editPet = function(pet) {
            petFactory.editPet(pet).then(
                function(success) {
                    console.log("success!");
                },
                function(error) {
                    console.log("error!");
                }
            );

        };


    }

})();
