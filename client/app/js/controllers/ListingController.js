/**
 * ListingController
 */
define([], function() {
  return ['$scope', '$http', '$routeParams', 'socketio', function($scope, $http, $routeParams, socketio) {
    $scope.listingId = $routeParams.listingId;
    socketio.on('findByIdSuccess', function(listing) {
      $scope.listing = listing;
      $scope.$apply();
    });
    socketio.emit('findById', {_id: $scope.listingId})
    $scope.$apply();
  }];
});