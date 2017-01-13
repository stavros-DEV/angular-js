(function () {
  'use strict';
  // arrays 1st arg prevents minification muggling
  angular.module('confusionApp')
    .controller('MenuController', ['$scope', 'menuService', function ($scope, menuService) {

      // var vm = this;
      $scope.tab = 1;
      $scope.filtText = '';
      $scope.showMenu = false;
      $scope.message = "Loading ...";

      $scope.dishes = menuService.getDishes().query(
        function (response) {
          $scope.dishes = response;
          $scope.showMenu = true;
        },
        function (response) {
          $scope.message = "Error: (server-down?) " + response.status + " " + response.statusText;
        }
      );
      // $scope.dishes = menuService.getDishes().then(
      //     function (response) {
      //       $scope.dishes = response.data;
      //       $scope.showMenu = true;
      //     },
      //     function(response) {
      //         $scope.message = "Error: "+response.status + " " + response.statusText;
      //     }
      //   );

      $scope.select = function (setTab) {
        $scope.tab = setTab;
        if (setTab === 2) {
          $scope.filtText = "appetizer";
        } else if (setTab === 3) {
          $scope.filtText = "mains";
        } else if (setTab === 4) {
          $scope.filtText = "dessert";
        } else {
          $scope.filtText = "";
        }
      };

      $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
      };

      $scope.showDetails = false;

      $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
      };

    }])

    .controller('DishDetailController', ['$scope', '$stateParams', 'menuService', function ($scope, $stateParams, menuService) {

      $scope.showDish = false;
      $scope.message = "Loading ...";

      $scope.dish = menuService.getDishes().get({
          id: parseInt($stateParams.id, 10)
        })
        .$promise.then(
          function (response) {
            $scope.dish = response;
            $scope.showDish = true;
          },
          function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
          }
        );

      // $scope.dish = menuService.getDish(parseInt($stateParams.id, 10)).then(
      //       function(response){
      //           $scope.dish = response.data;
      //           $scope.showDish=true;
      //       },
      //       function(response) {
      //           $scope.message = "Error: "+response.status + " " + response.statusText;
      //       }
      //   );

    }])

    .controller('IndexController', ['$scope', 'menuService', 'corporateFactory', function ($scope, menuService, corporateFactory) {

      $scope.showDish = false;
      $scope.message = "Loading ...";

      $scope.dish = menuService.getDishes().get({
          id: 0
        })
        .$promise.then(
          function (response) {
            $scope.dish = response;
            $scope.showDish = true;
          },
          function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
          }
        );
      // $scope.dish = menuService.getDish(0).then(
      //       function(response){
      //           $scope.dish = response.data;
      //           $scope.showDish = true;
      //       },
      //       function(response) {
      //           $scope.message = "Error: "+response.status + " " + response.statusText;
      //       }
      //   );

      $scope.promotion = menuService.getPromotions().get({
        id: 0
      });
      $scope.corporate = corporateFactory.getLeaders().get({
        id: 0
      });

    }])

    .controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {

      $scope.corporateLeaders = corporateFactory.getLeaders().query();

    }])

    .controller('ContactController', ['$scope', function ($scope) {

      $scope.feedback = {
        mychannel: "",
        firstName: "",
        lastName: "",
        agree: false,
        email: ""
      };

      var channels = [{
        value: "tel",
        label: "Tel."
      }, {
        value: "Email",
        label: "Email"
      }];

      $scope.channels = channels;
      $scope.invalidChannelSelection = false;

    }])

    .controller('FeedbackController', ['$scope', 'feedbackFactory', function ($scope, feedbackFactory) {

      $scope.sendFeedback = function () {

        console.log($scope.feedback);
        if ($scope.feedback.agree && ($scope.feedback.mychannel === "") && !$scope.feedback.mychannel) {
          $scope.invalidChannelSelection = true;
          console.log('incorrect');
        } else {
          $scope.invalidChannelSelection = false;

          feedbackFactory.getFeedbacks().save($scope.feedback);

          $scope.feedbackForm.$setPristine();

          $scope.feedback = {
            mychannel: "",
            firstName: "",
            lastName: "",
            agree: false,
            email: ""
          };
          $scope.feedback.mychannel = "";

        }
      };

    }])

    .controller('DishCommentController', ['$scope', 'menuService', function ($scope, menuService) {

      //Step 1: Create a JavaScript object to hold the comment from the form
      $scope.commentPreview = {
        rating: "5",
        author: "",
        comment: ""
      };

      $scope.submitComment = function () {

        //Step 2: This is how you record the date
        $scope.commentPreview.date = new Date().toISOString();

        // Step 3: Push your comment into the dish's comment array
        $scope.dish.comments.push($scope.commentPreview);

        //Step 4: reset your form to pristine and save to server
        $scope.commentForm.$setPristine();

        menuService.getDishes().save($scope.dish);

        $scope.mycomment = {
          rating: 5,
          comment: "",
          author: "",
          date: ""
        };

        //Step 5: reset your JavaScript object that holds your comment
        $scope.commentPreview = {
          rating: "5",
          author: "",
          comment: ""
        };

      };
    }])

  ;
})();
