(function() {
    'use strict';


    angular
        .module('app', ['ui.router', 'toastr', 'ngBootbox', 'ui.bootstrap', 'toggle-switch'])
        .config(function($urlRouterProvider, $stateProvider) {

            $urlRouterProvider.otherwise('/puppr/home');

            $stateProvider
                .state('puppr', {
                    url: '/puppr',
                    abstract: true,
                    templateUrl: '/app/layout/puppr.shell.html'
                })
                    .state('puppr.home', {
                        url: '/home',
                        controller: 'HomeController as home',
                        templateUrl: 'app/home/home.html'
                    })
                    .state('puppr.terms', {
                        url: '/terms',
                        controller: 'TermsController as terms',
                        templateUrl: 'app/home/terms.html'
                    })
                    .state('puppr.profile', {
                        url: '/profile',
                        abstract: true,
                        template: '<div ui-view></div>'
                    })
                        .state('puppr.profile.dashboard', {
                            url: '/dashboard?petId',
                            controller: 'DashboardController as dashboard',
                            templateUrl: 'app/profile/dashboard.html'
                        })
                        .state('puppr.profile.dog', {
                            url: '/dog?dogId',
                            controller: 'DogController as dog',
                            templateUrl: 'app/profile/dog.profile.html'
                        })
                        .state('puppr.profile.edit', {
                            url: '/edit?ownerId?petId',
                            controller: 'EditController as edit',
                            templateUrl: 'app/profile/edit.profile.html'
                        })
                        .state('puppr.profile.owner', {
                        url: '/owner?ownerId',
                        controller: 'OwnerController as owner',
                        templateUrl: 'app/profile/owner.profile.html'
                        })
                    .state('puppr.battle', {
                        url: '/battle',
                        abstract: true,
                        template: '<div ui-view></div>'
                    })
                        .state('puppr.battle.clash', {
                            url: '/clash',
                            controller: 'ClashController as clash',
                            templateUrl: 'app/battle/battle.html'
                        })
                        .state('puppr.battle.leaderboard', {
                            url: '/leaderboard',
                            controller: 'LeaderboardController as leaderboard',
                            templateUrl: 'app/battle/leaderboard.html'
                        })    
                    ;

        });
})();
