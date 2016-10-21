(function() {
    'use strict';

    angular
        .module('app')
        .controller('EditController', EditController);

    EditController.$inject = ['ownerFactory', 'breedFactory', 'petPhotoFactory', 'petFactory', '$ngBootbox', '$stateParams', 'authFactory'];

    function EditController(ownerFactory, breedFactory, petPhotoFactory, petFactory, $ngBootbox, $stateParams, authFactory) {
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

        

        function onFileUploaded(file, petId) {
            petPhotoFactory.addPhoto({ 
                petId: petId, url: file.url 
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
