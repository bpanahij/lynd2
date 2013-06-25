define ([], function () {
  return ['$scope', '$http', '$window', 'user', 'sidemenu', 'googleAnalytics', function ($scope, $http, $window, user, sidemenu, googleAnalytics) {
    googleAnalytics.listenTrack($scope, $window)
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