(function() {
    'use strict';

    angular
        .module('app')
        .directive('compareTo', compareTo);

    compareTo.$inject = [];

    /* @ngInject */
    function compareTo() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: link
        };
        return directive;

        function link(scope, element, attributes, ngModel) {
            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    }
})();
