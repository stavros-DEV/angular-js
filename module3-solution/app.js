(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItemsList.html',
    scope: {
      foundItemsArray: '<',
      onRemove: '&'
    }
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowItDown = this;

  narrowItDown.searchTerm = "";
  narrowItDown.found = null;

  narrowItDown.narrow = function () {
    if (!narrowItDown.searchTerm) {
      narrowItDown.found = [];
      return;
    }

    var promise = MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm);

    promise.then(function (response) {
      narrowItDown.found = response;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  };

  narrowItDown.removeItem = function (index) {
    narrowItDown.found.splice(index, 1);
    if (narrowItDown.found.length == 0) {
      narrowItDown.found = null;
    }
  }
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    // reach out to the server
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
      // process result and only keep items that match
      var foundItems = [];
      result.data.menu_items.forEach(function (obj) {

        if (obj.description.indexOf(searchTerm) !== -1) {
          foundItems.push(obj);
        }
      });

      return foundItems;
    });
  };
}

})();
