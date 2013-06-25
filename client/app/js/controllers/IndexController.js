define ([], function () {
  return ['$scope', '$http', '$location', '$state', 'user', 'auth', function ($scope, $http, $location, $state, user, auth) {
    $state.transitionTo ('signup/stepOne');
  }]
})
