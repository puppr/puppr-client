(function() {
    'use strict';

    angular
        .module('app')
        .factory('authFactory', authFactory);

    authFactory.$inject = ['apiUrl', '$http', '$q', 'localStorageService'];

    /* @ngInject */
    function authFactory(apiUrl, $http, $q, localStorageService) {
        var service = {
            initialize: initialize,
            register: register,
            login: login,
            logout: logout
        };

        service.isAuth = false;
        service.username = '';

        return service;

        ////////////////

        function initialize() {
            var authData = localStorageService.get('authorizationData');
            if(authData) {
                service.isAuth = true;
                service.username = authData.username;
                service.ownerId = authData.ownerId;
            }
        }

        function register(registration) {
            logout();

            var defer = $q.defer();

            $http.post(apiUrl + '/register', registration).then(
                function(response) {
                    defer.resolve(response.data);
                },
                function(error) {
                    console.log(error);
                    defer.reject(error);
                }
            );

            return defer.promise;
        }

        function login(username, password) {
            logout();

            var data = "grant_type=password&username=" + username +
                       "&password=" + password;

            var defer = $q.defer();

            $http.post(apiUrl + '/token',  data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).then(
                function(response) {
                    localStorageService.set('authorizationData', {
                        token: response.data.access_token,
                        username: username,
                        ownerId: response.data.ownerId
                    });

                    service.isAuth = true;
                    service.username = username;
                    service.ownerId = response.data.ownerId;

                    defer.resolve(response.data);
                },
                function(error) {
                    logout();
                    console.log(error);
                    defer.reject(error);
                }
            );

            return defer.promise;
        }

        function logout() {
            localStorageService.remove('authorizationData');

            service.isAuth = false;
            service.username = '';
            service.ownerId = null;
        }
    }
})();