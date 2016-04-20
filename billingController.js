angular.module('isCheckout').controller('billingCtrl',['$scope', 'pubSubFactory','isCartConstants', function($scope, pubSubFactory,isCartConstants) {
  $scope.billingName = "Billing Component";
  var onSummaryLoad = function(data) {
    
    $scope.formName = "billing";
    
    //Initialization
    $scope.billing = {};
    $scope.$parent.child.billing = $scope.billing;
    $scope.result1 = '';
    $scope.options1 = null;
    $scope.details1 = '';


    //Bind data
    $scope.billing.fname = data.name;
    $scope.billing.lname = data.name;
    $scope.billing.country="us";
    
  
  };
  var onRefresh = function(data)
  {
    //based on error code set the appropriate field to show the error.
    $scope.phoneInvalid=true;
  }

  //subscribe to page load and set which callback method to call
  pubSubFactory.subscribe($scope, isCartConstants.PageLoad, onSummaryLoad);
  
  //subscribe to page refresh and set call back method
  pubSubFactory.subscribe($scope, isCartConstants.PageUpdate, onRefresh);
  
    $scope.countryChange=function()
    {
       pubSubFactory.publish(isCartConstants.CountryChange, $scope.billing.country);
    };
}]);