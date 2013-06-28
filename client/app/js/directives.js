define ([], function () {
  'use strict';

  angular.module ('Lynd.directives', ['Lynd.services'])
    .directive ("scroll", function ($window) {
    return function (scope, element, attrs) {
      angular.element ($window).bind ("scroll", function (event) {
        event.preventDefault ();
        if (this.pageYOffset >= Number (attrs.scroll)) {
          scope.boolChangeClass = true;
          $ (element).css ({position: 'fixed', top: attrs.offset + 'px'})
        } else {
          scope.boolChangeClass = false;
          $ (element).css ({position: 'relative'})
        }
        scope.$apply ();
      });
    };
  })
    .directive('contenteditable', function() {
      return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
          // view -> model
          elm.bind('blur', function() {
            scope.$apply(function() {
              if (elm.html() == '' || elm.html() == '<br>') {
                ctrl.$setViewValue('');
                elm.html(attrs.placeholderText)
              } else {
                ctrl.$setViewValue(elm.html());
              }
            });
          });
          elm.bind('focus', function() {
            scope.$apply(function() {
              if (elm.html() == attrs.placeholderText) {
                elm.html('');
              }
            });
          });

          // model -> view
          ctrl.$render = function() {
            if (_.isUndefined(ctrl.$viewValue) || ctrl.$viewValue == '' || ctrl.$viewValue == '<br>') {
              elm.html(attrs.placeholderText);
            } else {
              elm.html(ctrl.$viewValue);
            }
          };

          // load init value from DOM
          ctrl.$setViewValue(elm.html());
        }
      };
    })
})
