(function() {
  'use strict';

  angular
    .module('app')
    .filter('ageFilter', ageFilter);

  function ageFilter() {
    return ageFilterFilter;

    ////////////////

    function calculateAge(birthday) { // birthday is a date
      var date = new Date(birthday);
      var ageDifMs = Date.now() - date.getTime();
      var ageDate = new Date(ageDifMs); // miliseconds from epoch
      return Math.abs(ageDate.getUTCFullYear() - 1970);
    }

    function ageFilterFilter() {
      return calculateAge(birthdate);
    }
  }
})();