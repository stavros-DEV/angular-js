(function () {
  'use strict';

  angular.module('confusionApp')
    .constant('baseURL', "http://localhost:3000/")
    .service('menuService', ['$resource', '$http', 'baseURL', function ($resource, $http, baseURL) {

      this.getDishes = function () {
        return $resource(baseURL + "dishes/:id", null, {
          'update': {
            method: 'PUT'
          }
        });
      };

      // this.getDishes = function () {
      //   return $http.get(baseURL + "dishes");
      // };
      //
      // this.getDish = function (index) {
      //   return $http.get(baseURL + "dishes/" + index);
      // };

      this.getPromotions = function () {
        return $resource(baseURL + "promotions/:id", null, {
          'update': {
            method: 'PUT'
          }
        });
      };

    }])

    .factory('corporateFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

      var corpfac = {};

      corpfac.getLeaders = function () {
        return $resource(baseURL + "leadership/:id", null, {
          'update': {
            method: 'PUT'
          }
        });
      };

      return corpfac;

    }])

    .factory('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

      var feedbackfac = {};

      feedbackfac.getFeedbacks = function () {
        return $resource(baseURL + "feedback/:id", null, {
          'update': {
            method: 'PUT'
          }
        });
      };

      return feedbackfac;

    }]);

})();
