var app = angular.module('isCheckout', ['ngAutocomplete', 'http-auth-interceptor'])

.config(['$httpProvider',function($httpProvider) {
        //This will intercept all http calls and broadcast the event
          $httpProvider.interceptors.push(function($rootScope, $timeout, $q) {
            return {
              request: function(request) {
                $rootScope.$broadcast('loading:show');
                return request;
              },
              response: function(response) {
                $rootScope.$broadcast('loading:hide')
                return response;
              },
              responseError: function(rejection) {
                $rootScope.$broadcast('call:error',rejection);
                return $q.reject(rejection);
            }
            }
          })
    }])

.run(['$rootScope', 'cartFactory', 'pubSubFactory', 'isCartConstants', 
function($rootScope, cartFactory, pubSubFactory, isCartConstants) {
    
     $rootScope.$on('loading:show', function(e) {
            $rootScope.cartloader = true;
          });

          $rootScope.$on('loading:hide', function(e) {
            $rootScope.cartloader = false;
          });
    
    /*-----------------------------------------------------------
    //  Load the page data and broadcast the page data
    //  this event has to be subscribed by all controllers
    -----------------------------------------------------------*/
    
    cartFactory.communicator(isCartConstants.formName, isCartConstants.Get, isCartConstants.GetJsonURL, isCartConstants.contentType).then(function(response) {
        pubSubFactory.publish(isCartConstants.PageLoad, response.data);
    });

    

  }])
  .controller('mainForm', function($scope, cartFactory, pubSubFactory,isCartConstants) {
    $scope.name = "Parent Form";
    $scope.cartType = 1; //Cart Type Wizard or single page
    $scope.child = {};
    $scope.request = "";



//Submit button interaction
    $scope.SubmitForm = function(formName) {
      var isvalid = true;
      
      $scope.request = angular.toJson($scope.child);

var request = $scope.child;

      //if the form is valid call service
      if (isvalid) {
          //MOCK submit service
          cartFactory.communicator(request, isCartConstants.Get, isCartConstants.GetJsonURL, isCartConstants.contentType).then(function(response) {
            
            //publish updated data.
            pubSubFactory.publish(isCartConstants.PageUpdate, response.data);
            
            //set server side errors
            $scope.formError = "Billing Address Invalid";
          });
    
      }
      return false; //failed
    };
  });
  
  