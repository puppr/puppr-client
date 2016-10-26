(function() {
    'use strict';

    angular
        .module('app')
        .controller('EditController', EditController);

    EditController.$inject = ['ownerFactory', 'breedFactory', 'petPhotoFactory', '$mdDialog', 'petFactory', '$stateParams', 'authFactory', '$scope'];

    function EditController(ownerFactory, breedFactory, petPhotoFactory, $mdDialog, petFactory, $stateParams, authFactory, $scope) {
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
            if (vm.name === "" || vm.name === null || vm.dogFood === "" || vm.dogFood === null || vm.toy === "" || vm.toy === null || vm.activity === "" || vm.activity === null) {
                $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Sorry, an error has occurred')
                    .textContent("Please make sure all fields have been filled out before continuing")
                    .ok('Got it!')
                );
            } else {
                petFactory.editPet(pet).then(
                    function(success) {
                        console.log("success!");
                    },
                    function(error) {
                        console.log("error!");
                    }
                );
            }
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

        vm.deletePhoto = function(photo) {
            var confirm = $mdDialog.confirm()
                .title("Are you sure you'd like you delete this image?")
                .textContent('It will be permanently removed from our database')
                .ariaLabel('Lucky day')
                .ok('Yes')
                .cancel('No');

            $mdDialog.show(confirm).then(function() {
                var z = 0;
                for (z = 0; z < vm.owner.pets.length; z++) {
                    if (vm.owner.pets[z].petId === photo.petId) {
                        var index = vm.owner.pets[z].petPhotos.indexOf(photo);
                        petPhotoFactory.deletePhoto(photo).then(
                            function(photo) {
                                console.log(vm.owner.pets);
                                console.log(photo);
                                var z = 0;
                                for (z = 0; z < vm.owner.pets.length; z++) {
                                    if (vm.owner.pets[z].petId === photo.petId) {
                                        // var index = vm.owner.pets[z].petPhotos.indexOf(photo);
                                        vm.owner.pets[z].petPhotos.splice(index, 1);
                                    }
                                }

                            },
                            function(error) {}
                        );
                    }
                }
                console.log('Confirmed!');
            });
        };

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

        vm.showAdvanced = function(ev) {
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
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'app/profile/add.dog.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
        };

        function DialogController($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
            };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

            $scope.addPet = function() {
                if (vm.selectedBreed === undefined || vm.name === "" || vm.name === null || vm.birthday === undefined || vm.food === "" || vm.food === null || vm.toy === "" || vm.toy === null || vm.activity === "" || vm.activity === null) {
                    $mdDialog.show(
                        $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Sorry, an error has occurred')
                        .textContent("Please make sure all fields have been filled out before continuing")
                        .ok('Got it!')
                    );
                } else {
                    vm.newPet = {
                        "name": vm.name,
                        "dateOfBirth": vm.birthday,
                        "dogFood": vm.food,
                        "gender": vm.gender,
                        "toy": vm.toy,
                        "activity": vm.activity,
                        "ownerId": vm.currentOwnerId,
                        "breedId": vm.selectedBreed.breedId,
                    };
                    console.log(vm.newPet);
                    vm.saving = true;
                    petFactory.addPet(vm.newPet).then(
                        function(theNewPet) {
                            vm.saving = false;
                            vm.theNewPet = theNewPet;
                            console.log(vm.theNewPet);
                            $state.go('puppr.profile.dashboard', { ownerId: vm.currentOwnerId });
                        },
                        function() {}
                    );
                }
            };
        }


    }

})();
