'use strict'
var Lynd = Lynd || {}
Lynd.Services = angular.module ('Lynd.services', [])
Lynd.Controllers = angular.module ('Lynd.controllers', [])
Lynd.Filters = angular.module ('Lynd.filters', [])
Lynd.Directives = angular.module ('Lynd.directives', [])
angular.module ('Lynd', ['ui.state', 'Lynd.services', 'Lynd.controllers', 'Lynd.filters', 'Lynd.directives'])
  .config (['$stateProvider', '$routeProvider', function ($stateProvider) {
    $stateProvider
      .state ('index', {
      url: "",
      views: {
        "menu": {
          templateUrl: "/app/partials/blank.html"
        },
        "header": {
          controller: 'HeaderController',
          templateUrl: "/app/partials/blank.html"
        },
        "footer": {
          templateUrl: "/app/partials/blank.html"
        },
        "content": {
          controller: 'IndexController',
          templateUrl: "/app/partials/blank.html"
        }
      }
    })
      .state ('search', {
      url: "/search",
      views: {
        "menu": {
          controller: 'MenuProviderController',
          templateUrl: "/app/partials/menu.html"
        },
        "header": {
          controller: 'SearchHeaderController',
          templateUrl: "/app/partials/guest/search/search.header.html"
        },
        "footer": {
          templateUrl: "/app/partials/guest/search/search.footer.html"
        },
        "content": {
          controller: 'SearchController',
          templateUrl: "/app/partials/guest/search/search.content.html"
        }
      }
    })
      .state ('addToQuiver', {
      url: "/addToQuiver",
      views: {
        "menu": {
          controller: 'MenuProviderController',
          templateUrl: "/app/partials/menu.html"
        },
        "header": {
          controller: 'HeaderController',
          templateUrl: "/app/partials/member/listItem/header.html"
        },
        "footer": {
          templateUrl: "/app/partials/member/listItem/footer.html"
        },
        "content": {
          controller: 'ListItemController',
          templateUrl: "/app/partials/member/listItem/listItem.html"
        }
      }
    })
      .state ('quiver', {
      url: "/quiver",
      views: {
        "menu": {
          controller: 'MenuProviderController',
          templateUrl: "/app/partials/menu.html"
        },
        "header": {
          controller: 'HeaderController',
          templateUrl: "/app/partials/member/listings/header.html"
        },
        "footer": {
          templateUrl: "/app/partials/member/listings/footer.html"
        },
        "content": {
          controller: 'ListingsController',
          templateUrl: "/app/partials/member/listings/listings.html"
        }
      }
    })
      .state ('listing', {
      url: "/listing/:listingId",
      views: {
        "menu": {
          controller: 'MenuProviderController',
          templateUrl: "/app/partials/menu.html"
        },
        "header": {
          controller: 'HeaderController',
          templateUrl: "/app/partials/member/listing/header.html"
        },
        "footer": {
          templateUrl: "/app/partials/member/listing/footer.html"
        },
        "content": {
          controller: 'ListingController',
          templateUrl: "/app/partials/member/listing/listing.html"
        }
      }
    })
      .state ('signup_1', {
      url: "/signup/stepOne",
      views: {
        "menu": {
          templateUrl: "/app/partials/menu.html"
        },
        "header": {
          templateUrl: "/app/partials/guest/signup/stepOne/header.html"
        },
        "footer": {
          templateUrl: "/app/partials/guest/signup/stepOne/footer.html"
        },
        "content": {
          controller: 'SignupStepOneController',
          templateUrl: "/app/partials/guest/signup/stepOne/content.html"
        }
      }
    })
      .state ('signup_2', {
      url: "/signup/stepTwo",
      views: {
        "menu": {
          templateUrl: "/app/partials/menu.html"
        },
        "header": {
          templateUrl: "/app/partials/guest/signup/stepTwo/header.html"
        },
        "footer": {
          templateUrl: "/app/partials/guest/signup/stepTwo/footer.html"
        },
        "content": {
          controller: 'SignupStepTwoController',
          templateUrl: "/app/partials/guest/signup/stepTwo/content.html"
        }
      }
    })
      .state ('signup_3_a', {
      url: "/signup/stepThree",
      views: {
        "menu": {
          templateUrl: "/app/partials/menu.html"
        },
        "header": {
          controller: 'FinishUpController',
          templateUrl: "/app/partials/guest/signup/stepThree/header.html"
        },
        "footer": {
          templateUrl: "/app/partials/guest/signup/stepThree/footer.html"
        },
        "content": {
          controller: 'SignupStepThreeController',
          templateUrl: "/app/partials/guest/signup/stepThree/content.html"
        }
      }
    })
      .state ('signup_3_b', {
      url: "/signup/stepFour",
      views: {
        "menu": {
          templateUrl: "/app/partials/menu.html"
        },
        "header": {
          controller: 'FinishUpController',
          templateUrl: "/app/partials/guest/signup/stepFour/header.html"
        },
        "footer": {
          templateUrl: "/app/partials/guest/signup/stepFour/footer.html"
        },
        "content": {
          controller: 'SignupStepThreeController',
          templateUrl: "/app/partials/guest/signup/stepFour/content.html"
        }
      }
    })
      .state ('signup_5', {
      url: "/signup/stepFive",
      views: {
        "menu": {
          controller: 'MenuProviderController',
          templateUrl: "/app/partials/menu.html"
        },
        "header": {
          controller: 'HeaderController',
          templateUrl: "/app/partials/guest/signup/stepFive/header.html"
        },
        "footer": {
          templateUrl: "/app/partials/guest/signup/stepFive/footer.html"
        },
        "content": {
          controller: 'SignupStepFiveController',
          templateUrl: "/app/partials/guest/signup/stepFive/content.html"
        }
      }
    })
  }])
