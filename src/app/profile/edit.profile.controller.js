(function() {
    'use strict';

    angular
        .module('app')
        .controller('EditController', EditController);

    EditController.$inject = ['ownerFactory', 'breedFactory', 'petPhotoFactory', '$ngBootbox', '$stateParams', 'authFactory'];

    function EditController(ownerFactory, breedFactory, petPhotoFactory, $ngBootbox, $stateParams, authFactory) {
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
                }
            );
        }

    }

})();
