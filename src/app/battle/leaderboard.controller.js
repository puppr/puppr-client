(function() {
        'use strict';

        angular
            .module('app')
            .controller('LeaderboardController', LeaderboardController);

        LeaderboardController.$inject = ['petFactory', '$ngBootbox', '$stateParams', 'battleVoteFactory'];

        function LeaderboardController(petFactory, $ngBootbox, $stateParams, battleVoteFactory) {
            var vm = this;
            activate();
            activate1();

            function activate() {
                return petFactory.getPets()
                    .then(
                        function(data) {
                        

                            vm.pets = data;
                            console.log(vm.pets);


                        }
                    );
            }

            function activate1() {
                return battleVoteFactory.getBattleVotes()
                    .then(
                        function(data) {
                        

                            vm.battlevotes = data;
                            console.log(data);


                        }
                    );
            }

    }

})();