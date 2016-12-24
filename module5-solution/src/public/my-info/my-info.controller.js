(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['userDetails']
function MyInfoController(userDetails) {
  var $ctrl = this;
  $ctrl.user = userDetails;
}

})();
