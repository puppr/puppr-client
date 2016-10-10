(function() {
    'use strict';

    angular
        .module('app')
        .controller('OwnerController', OwnerController);

    OwnerController.$inject = ['ownerFactory', '$ngBootbox','$stateParams','$state'];

    function OwnerController(ownerFactory, $ngBootbox,$stateParams,$state ) {
        var vm = this;
        vm.owners=[];

        activate();

        function activate() {

            if ($stateParams.ownerId) {
                ownerFactory.getCurrentOwner()
                    .then(function(data) {
                        vm.owners = data;
                        console.log(vm.owners);
                    });


            } else {
                vm.owners = {};

            }


        }
        //     ownerFactory.getOwnerById().then(
        //         function(data) {
        //             vm.owner = data;
        //             console.log(vm.owner);      
        //         },
        //         function(error) {}
        //     );
        // }


    }

})();