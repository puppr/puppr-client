(function() {
        'use strict';

        angular
            .module('app')
            .controller('LeaderboardController', LeaderboardController);

        LeaderboardController.$inject = ['petFactory', '$ngBootbox', "$stateParams"];

        function LeaderboardController(petFactory, $ngBootbox, $stateParams) {
            var vm = this;
            
            activate();

            function activate() {
                return petFactory.getPets()
                    .then(
                        function(data) {
                        

                            vm.pets = data;


                        }
                    );
            }

    }

})();