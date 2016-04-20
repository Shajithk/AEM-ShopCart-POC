angular.module('isCheckout').factory('cartFactory', ['$http', '$q','isCartConstants', function($http, $q,isCartConstants) {

  return {

    communicator: function(formDetails, cmethod, curl, contentType) {

      /*
        "deffered" as a variable it will first go see if that variable exists, if it does, it will use "deffered", 
        if not it will create an $q.defer() object and assign it to "deffered".
      */
      
      var deffered = deffered || $q.defer();
      
      
      /* Example Data, which can be sent from controller
      formDetails = {formName: $scope.formName, formData: $scope.data};
      */
      
      if(cmethod === 'POST'){
        // Set the Content-Type 
        $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
      }

      var req = {
        method: cmethod,
        url: curl,
        data: formDetails
      };

      $http(req).then(function(response) {
        //On success callback
        deffered.resolve(JSON.stringify(response.data));
      }, function(errResponse) {
        /*
            On Error callback, get the error object in controller and assign it to an errObject globally.
            And use the global errObject in template to assign to an element.
        */
        deffered.reject(errResponse);
      });

      return deffered.promise;
    }
  };
}]);