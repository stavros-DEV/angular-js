(function () {
'use strict';

angular.module('LunchApp', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {

  // initializations
  $scope.dishes = "";
  $scope.message = "";

  $scope.checkQuantity = function () {

    // split the csv input text, returns an array
    var dishArray = $scope.dishes.split(',');

    // trim array contents and remove empty strings here
    dishArray = dishArray.filter(function(e){
      return e.trim();
    });

    // main logic here
    if (dishArray.length == 0) {
      $scope.message = "Please enter data first";
      $scope.messageStyle = "message-error";
      $scope.inputStyle = "input-error";
    } else if (dishArray.length <= 3) {
      $scope.message = "Enjoy";
      $scope.messageStyle = "message-success";
      $scope.inputStyle = "input-success";
    } else {
      $scope.message = "Too much!";
      $scope.messageStyle = "message-success";
      $scope.inputStyle = "input-success";
    }
  };

}

})();
