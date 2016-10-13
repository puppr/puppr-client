(function() {
    'use strict';


    angular
        .module('app', ['ui.router', 'toastr', 'ngBootbox', 'ui.bootstrap', 'ngAnimate', 'angular-filepicker', 'ngMaterial', 'LocalStorageModule'])
        .run(function(authFactory) {
            authFactory.initialize();
        })
        .config(function(filepickerProvider) {
            filepickerProvider.setKey('A2DG6zAaOSC2z2lZ6rm4bz');
        })
        .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
            $httpProvider.interceptors.push('authInterceptorService');
        })
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
                .state('puppr.new', {
                    url: '/new',
                    abstract: true,
                    templateUrl: 'app/home/new.html'
                })
                .state('puppr.new.dog', {
                    url: '/dog',
                    controller: 'NewDogController as newDog',
                    templateUrl: 'app/home/new.dog.html'
                })
                .state('puppr.new.owner', {
                    url: '/owner',
                    controller: 'NewOwnerController as newOwner',
                    templateUrl: 'app/home/new.owner.html'
                })
                .state('puppr.profile', {
                    url: '/profile',
                    abstract: true,
                    template: '<div ui-view></div>'
                })
                .state('puppr.profile.dashboard', {
                    url: '/dashboard',
                    controller: 'DashboardController as dashboard',
                    templateUrl: 'app/profile/dashboard.html'
                })
                .state('puppr.profile.dog', {
                    url: '/dog?petId',
                    controller: 'DogController as dog',
                    templateUrl: 'app/profile/dog.profile.html'
                })
                .state('puppr.profile.edit', {
                    url: '/edit',
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
                    url: '/clash?battleId',
                    controller: 'ClashController as clash',
                    templateUrl: 'app/battle/clash.html'
                })
                .state('puppr.battle.pets', {
                    url: '/pets?challengePetId',
                    controller: 'PetsController as pet',
                    templateUrl: 'app/battle/pets.html'
                })
                .state('puppr.battle.vote', {
                    url: '/vote',
                    controller: 'VoteController as vote',
                    templateUrl: 'app/battle/vote.html'
                })
                .state('puppr.battle.leaderboard', {
                    url: '/leaderboard',
                    controller: 'LeaderboardController as leaderboard',
                    templateUrl: 'app/battle/leaderboard.html'
                });

        });
})();
