(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$q', '$http', 'ApiBasePath'];
function MenuDataService($q, $http, ApiBasePath) {
  var service = this;

  service.getAllCategories = function () {
    var deferred = $q.defer();

    return $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    }).then(function (result) {
      deferred.resolve(result.data);
      return deferred.promise;
    });
  }

  service.getMenuForCategory = function (shortName) {
    var deferred = $q.defer();

    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: shortName
      }
    }).then(function (result) {
      deferred.resolve(result.data);
      return deferred.promise;
    });
  };

}

})();
