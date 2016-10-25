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

        vm.editOwner = function(owner) {
            if (vm.owner.firstName === "" || vm.owner.firstName === null || vm.owner.lastName === "" || vm.owner.lastName === null || vm.owner.biography === "" || vm.owner.biography === null) {
                $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Sorry, an error has occurred')
                    .textContent("Please make sure all fields have been filled out before continuing")
                    .ok('Got it!')
                );
            } else {
                ownerFactory.editOwner(vm.currentOwnerId, owner).then(
                    function(success) {
                        console.log("success!");
                    },
                    function(error) {
                        console.log("error!");
                    }
                );
            }

        };

        // vm.deletePhoto = function(photo) {
        //     $ngBootbox.confirm("Are you sure you want to delete this photo?")
        //         .then(function() {
        //             var z = 0;
        //             for (z = 0; z < vm.owner.pets.length; z++) {
        //                 if (vm.owner.pets[z].petId === photo.petId) {
        //                     for (vm.owner.pets[z].petPhotos )
        //                 }
        //             }
        //             var index = vm.owner.pets.petPhotos.indexOf(photo);
        //             petPhotoFactory.deletePhoto(photo).then(
        //                 function(photo) {
        //                     vm.students.splice(index, 1);
        //                 },
        //                 function(error) {}
        //             );
        //             console.log('Confirmed!');
        //         }, function() {
        //             console.log('Confirm dismissed!');
        //         });

        // };

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


    }

})();
