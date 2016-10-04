(function() {
    'use strict';

    angular
        .module('app')
        .controller('NewController', NewController);

    NewController.$inject = ['ownerFactory', '$ngBootbox', '$stateParams'];

    function NewController(ownerFactory, $ngBootbox, $stateParams) {
        var vm = this;

        vm.currentOwnerId = $stateParams.ownerId;

        console.log($stateParams);

        vm.months = [{
            "month": "January"
        }, {
            "month": "February"
        }, {
            "month": "March"
        }, {
            "month": "April"
        }, {
            "month": "May"
        }, {
            "month": "June"
        }, {
            "month": "July"
        }, {
            "month": "August"
        }, {
            "month": "September"
        }, {
            "month": "October"
        }, {
            "month": "November"
        }, {
            "month": "December"
        } ];

        vm.days = [{
            "day": "1"
        }, {
            "day": "2"
        }, {
            "day": "3"
        }, {
            "day": "4"
        }, {
            "day": "5"
        }, {
            "day": "6"
        }, {
            "day": "7"
        }, {
            "day": "8"
        }, {
            "day": "9"
        }, {
            "day": "10"
        }, {
            "day": "11"
        }, {
            "day": "12"
        }, {
            "day": "13"
        }, {
            "day": "14"
        }, {
            "day": "15"
        }, {
            "day": "16"
        }, {
            "day": "17"
        }, {
            "day": "18"
        }, {
            "day": "19"
        }, {
            "day": "20"
        }, {
            "day": "21"
        }, {
            "day": "22"
        }, {
            "day": "23"
        }, {
            "day": "24"
        }, {
            "day": "25"
        }, {
            "day": "26"
        }, {
            "day": "27"
        }, {
            "day": "28"
        }, {
            "day": "29"
        }, {
            "day": "30"
        }, {
            "day": "31"
        } ];

        vm.years = [{
            "year": "2016"
        }, {
            "year": "2015"
        }, {
            "year": "2014"
        }, {
            "year": "2013"
        }, {
            "year": "2012"
        }, {
            "year": "2011"
        }, {
            "year": "2010"
        }, {
            "year": "2009"
        }, {
            "year": "2008"
        }, {
            "year": "2007"
        }, {
            "year": "2006"
        }, {
            "year": "2005"
        }, {
            "year": "2004"
        }, {
            "year": "2003"
        }, {
            "year": "2002"
        }, {
            "year": "2001"
        }, {
            "year": "2000"
        }, {
            "year": "1999"
        }, {
            "year": "1998"
        }, {
            "year": "1997"
        }, {
            "year": "1996"
        }, {
            "year": "1995"
        }, {
            "year": "1994"
        }, {
            "year": "1993"
        }, {
            "year": "1992"
        }, {
            "year": "1991"
        }, {
            "year": "1990"
        }, ];

        function activate(id) {
            ownerFactory.getOwnerById(id).then(
                function(owner) {
                    vm.owner = owner;
                    console.log(vm.patient);
                },
                function(error) {
                    console.log("error!");
                }
            );
        }

        activate(vm.currentOwnerId);


        vm.editOwner = function(owner) {
            ownerFactory.editOwner(owner).then(
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