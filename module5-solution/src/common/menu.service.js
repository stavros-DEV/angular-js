(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;
  service.user = null;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};

    return $http.get(ApiPath + '/menu_items/' + category + '.json').then(
      function (response) {
        return response;
      },
      function (response) {
        return response;
      }
    );
  };

}



})();
