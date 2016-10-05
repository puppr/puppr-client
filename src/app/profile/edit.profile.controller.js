(function() {
    'use strict';

    angular
        .module('app')
        .controller('EditController', EditController);

    EditController.$inject = ['ownerFactory', 'breedFactory', '$ngBootbox', '$stateParams'];

    function EditController(ownerFactory, breedFactory, $ngBootbox, $stateParams) {
        var vm = this;
        vm.currentOwnerId = $stateParams.ownerId;

        vm.months = [{
            "month": "January",
            "number": "01"
        }, {
            "month": "February",
            "number": "02"
        }, {
            "month": "March",
            "number": "03"
        }, {
            "month": "April",
            "number": "04"
        }, {
            "month": "May",
            "number": "05"
        }, {
            "month": "June",
            "number": "06"
        }, {
            "month": "July",
            "number": "07"
        }, {
            "month": "August",
            "number": "08"
        }, {
            "month": "September",
            "number": "09"
        }, {
            "month": "October",
            "number": "10"
        }, {
            "month": "November",
            "number": "11"
        }, {
            "month": "December",
            "number": "12"
        }];

        vm.days = [{
            "day": "01"
        }, {
            "day": "02"
        }, {
            "day": "03"
        }, {
            "day": "04"
        }, {
            "day": "05"
        }, {
            "day": "06"
        }, {
            "day": "07"
        }, {
            "day": "08"
        }, {
            "day": "09"
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
        }];

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
                    console.log(vm.owner);
                    var o = 0;
                    for (o = 0; o < vm.owner.pets.length; o++) {
                        var str = vm.owner.pets[o].dateOfBirth;
                        vm.year = str.substr(0, 4);
                        vm.month = str.substr(5, 2);
                        vm.day = str.substr(8, 2);
                        console.log(vm.owner.pets[0].dateOfBirth);
                        console.log(vm.year);
                        console.log(vm.month);
                        console.log(vm.day);
                    }
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

    }

})();
