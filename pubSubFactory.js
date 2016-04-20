angular.module('isCheckout').factory('pubSubFactory', ['$rootScope', function($rootScope) {
  return {

    // publish your event
    // for ex) page load, page update, country change
    publish: function(event, data) {
      $rootScope.$broadcast(event,data);
    },

    // subscribe to event
    //controllers will use this method to subscribe to any event.
    subscribe: function($scope, event, handler) {
      $scope.$on(event, function(args, data) {
        handler(data);
      });
    }
  }
}]);