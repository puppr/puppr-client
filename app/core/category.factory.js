(function() {
    'use strict';

    angular
        .module('app')
        .factory('categoryFactory', categoryFactory);

    //injecting parameters to the factory
    categoryFactory.$inject = ['$http', '$q', 'toastr', 'apiUrl'];

    function categoryFactory($http, $q, toastr, apiUrl) {
        var service = {
            getCategories: getCategories,
            getCategoryById: getCategoryById,
            addCategory: addCategory,
            editCategory: editCategory,
            deleteCategory: deleteCategory
        };

        return service;

        function getCategories() {
            var deferred = $q.defer();

            //communicating with the api
            $http.get(apiUrl + '/categories/').then(
                function(response) {
                    deferred.resolve(response.data);
                },
                function(err) {
                    toastr.error('Oh no! An error has occurred. Please try again.');
                    deferred.reject(err);
                }
            );

            //returns the array
            return deferred.promise;
        }

        function getCategoryById(id) {
            var deferred = $q.defer();

            //communicating with the api
            $http.get(apiUrl + '/categories/' + id).then(
                function(response) {
                    deferred.resolve(response.data);
                },
                function(err) {
                    toastr.error('Oh no! An error has occurred. Please try again.');
                    deferred.reject(err);
                }
            );

            //returns the array
            return deferred.promise;
        }

        function addCategory(category) {
            var deferred = $q.defer();

            //communicating with the api
            $http.post(apiUrl + '/categories/', category).then(
                function(response) {
                    toastr.success('The category was successfully added to the database.');
                    deferred.resolve(response.data);
                },
                function(err) {
                    toastr.error('Oh no! An error has occurred. Please try again.');
                    deferred.reject(err);
                }
            );

            //returns the array
            return deferred.promise;
        }


        function editCategory(category) {
            var deferred = $q.defer();

            //communicating with the api
            $http.put(apiUrl + '/categories/' + category.categoryId, category).then(
                function(response) {
                    toastr.success("This category's information has been successfully edited.");
                    deferred.resolve(response.data);
                },
                function(err) {
                    toastr.error('Oh no! An error has occurred. Please try again.');
                    deferred.reject(err);
                }
            );

            //returns the array
            return deferred.promise;
        }

        function deleteCategory(category) {
            var deferred = $q.defer();

            //communicating with the api
            $http.delete(apiUrl + '/categories/' + category.categoryId).then(
                function(response) {
                    toastr.success('This category was successfully removed from the database.');
                    deferred.resolve(response.data);
                },
                function(err) {
                    toastr.error('Oh no! An error has occurred. Please try again.');
                    deferred.reject(err);
                }
            );

            //returns the array
            return deferred.promise;
        }

    }
})();
