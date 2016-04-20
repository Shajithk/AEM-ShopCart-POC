angular.module('isCheckout')
.directive('autoComplete',['$timeout', function($timeout) {
    return function(scope, iElement, iAttrs) {
            iElement.autocomplete({
                source: scope[iAttrs.uiItems],
                select: function() {
                    $timeout(function() {
                      iElement.trigger('input');
                    }, 0);
                }
            });
    };
}])

.directive("mainForm", [

  function() {
    return {
      restrict: "A",
      controller: [

        "$scope",

        function($scope) {

          var childrenFormsCount = 0;
          var validChildrenFormsCount = 0;

          function onChildFormChanged() {
            $scope.mainFormValid = childrenFormsCount === validChildrenFormsCount;
          }

          this.addChildForm = function(childFormCtrl) {
            // TODO save reference to child form controller
            childrenFormsCount++;
          };

          this.removeChildForm = function(childFormCtrl) {
            // TODO remove reference to child form controller
            childrenFormsCount--;
            if (childrenFormsCount < 0) {
              childrenFormsCount = 0;
            }
          };

          this.onChildFormValid = function() {
            validChildrenFormsCount++;
            onChildFormChanged();
          };

          this.onChildFormInvalid = function() {
            validChildrenFormsCount--;
            if (validChildrenFormsCount < 0) {
              validChildrenFormsCount = 0;
            }
            onChildFormChanged();
          };
        }
      ]
    };
  }
])

.directive("childForm", [

  function() {
    return {
      restrict: "A",
      scope: {},
      require: ["^mainForm", "?form"],
      link: function($scope, el, attributes, controllers) {
        var mainFormCtrl = controllers[0];
        var formCtrl = controllers[1];

        mainFormCtrl.addChildForm(formCtrl);

        $scope.$on("$destroy", function() {
          mainFormCtrl.removeChildForm(formCtrl);
        });

        $scope.$watch(function() {
          return formCtrl.$valid;
        }, function(value) {
          if (value === true) {
            mainFormCtrl.onChildFormValid();
          } else {
            mainFormCtrl.onChildFormInvalid();
          }
        });
      }
    }
  }
])
.directive('phoneInput',['$filter', '$browser', function($filter, $browser) {
  console.log("coming under phoneInput directive");
    return {
        require: 'ngModel',
        scope: true,
        controller:function($scope){
        console.log($scope.billing.country)
        },
        link: function($scope, $element, $attrs, ngModelCtrl) {
         console.log(billing.country);
          //console.log( $attrs['phoneInput']);
          console.log($attrs);
          console.log("$attrs[phoneInput] = " +$attrs['phoneInput']);
            var listener = function() {
                var value = $element.val().replace(/[^0-9]/g, '');
                $element.val($filter('tel')(value, false));
            };

            // This runs when we update the text field
            ngModelCtrl.$parsers.push(function(viewValue) {
                return viewValue.replace(/[^0-9]/g, '').slice(0,10);
            });

            // This runs when the model gets updated on the scope directly and keeps our view in sync
            ngModelCtrl.$render = function() {
                $element.val($filter('tel')(ngModelCtrl.$viewValue, false));
            };

            $element.bind('change', listener);
            $element.bind('keydown', function(event) {
                var key = event.keyCode;
                // If the keys include the CTRL, SHIFT, ALT, or META keys, or the arrow keys, do nothing.
                // This lets us support copy and paste too
                if (key == 91 || (15 < key && key < 19) || (37 <= key && key <= 40)){
                    return;
                }
                $browser.defer(listener); // Have to do this or changes don't get picked up properly
            });

            $element.bind('paste cut', function() {
                $browser.defer(listener);
            });
        }

    };
}]);