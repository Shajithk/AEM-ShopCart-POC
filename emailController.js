angular.module('isCheckout').controller('emailCtrl', function($scope, pubSubFactory,isCartConstants) {
  $scope.emailName = "Email Component";
   var onSummaryLoad = function(data) {
    //Initialization
    $scope.account = {};
    $scope.$parent.child.account = $scope.account;
 
    //parse data
    var email = data.login + '@' + data.login+'.com';
    
    //Bind data
    $scope.account.email = email;
  };
  
  //subscribe to page load
  pubSubFactory.subscribe($scope, isCartConstants.PageLoad, onSummaryLoad);
 
});