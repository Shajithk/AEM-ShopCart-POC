angular.module('isCheckout').controller('paymentCtrl', function($scope, pubSubFactory,isCartConstants) {
  $scope.paymentName = "Payment Component";


  var onSummaryLoad = function(data) {
    //Initialization
    $scope.payment = {};
    $scope.$parent.child.payment = $scope.payment;


    //Bind data
    $scope.payment.ptype = "visa";
    $scope.payment.pcvv = "234";
  };

  var onCountryChange = function(data) {
    if (data == "CA")
      $scope.payment.ptype = "mastercard";
    else
      $scope.payment.ptype = "visa";
  };


  //subscribe to page load
  pubSubFactory.subscribe($scope, isCartConstants.PageLoad, onSummaryLoad);
  pubSubFactory.subscribe($scope, isCartConstants.CountryChange, onCountryChange);

});