define ([], function () {
  return ['$scope', '$http', 'user', 'sidemenu', function ($scope, $http, user, sidemenu) {
    sidemenu.invoke ()
    $scope.menuHeader = "Menu"
    $scope.closeMenu = function() {
      sidemenu.toggleMenu()
    }

    if (user.isUserRegistered ()) {
      /**
       * Logged in menu
       * @type {Array}
       */
      $scope.menuItems = [
        {
          menuTitle: "Search",
          route: "#/search",
          icon: "icon-search"
        },
        {
          menuTitle: "Quiver",
          route: "#/quiver",
          icon: "icon-forward"
        }
      ]
      $scope.bottomMenuItems = [
        {
          menuTitle: "Signup",
          route: "#/signup/stepOne"
        }
      ]
    }
    else {
      /**
       * Logged out menu / guest menu
       * @type {Array}
       */
      $scope.menuItems = [
        {
          menuTitle: "Search",
          route: "#/search",
          icon: "icon-search"
        },
        {
          menuTitle: "Quiver",
          route: "#/quiver",
          icon: "icon-forward"
        }
      ]
      $scope.bottomMenuItems = [
        {
          menuTitle: "Signup",
          route: "#/signup/stepOne"
        }
      ]
    }
  }]
})