(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoryItemsController', CategoryItemsController);


CategoryItemsController.$inject = ['items'];
function CategoryItemsController(items) {
  var categoryItemsCtrl = this;
  console.log(items);
  categoryItemsCtrl.items = items.menu_items;
  categoryItemsCtrl.category = items.category;
}

})();
