(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService', 'UserService'];
function SignUpController(MenuService, UserService) {
  var $ctrl = this;
  $ctrl.noSuchMenu = false;

  $ctrl.submit = function () {

    var response = MenuService.getMenuItems($ctrl.user.dishNumber).then(function (response) {
      if (response.status == 500) {
        $ctrl.noSuchMenu = true;
      } else {
        $ctrl.noSuchMenu = false;
        UserService.saveUserDetails($ctrl.user);
        $ctrl.message = "Your information has been saved";
      }
    });
  };
}

})();
