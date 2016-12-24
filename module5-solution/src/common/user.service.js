(function () {
"use strict";

angular.module('common')
.service('UserService', UserService);

function UserService() {
  var service = this;
  service.user = null;

  service.saveUserDetails = function (user) {
    service.user = user;
  };

  service.getUserDetails = function () {
    return service.user;
  }
}

})();
