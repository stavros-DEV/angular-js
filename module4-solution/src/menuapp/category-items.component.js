(function () {
'use strict';

angular.module('MenuApp')
.component('categoryItems', {
  templateUrl: 'src/menuapp/templates/category-items-component.template.html',
  bindings: {
    items: '<'
  }
});

})();
