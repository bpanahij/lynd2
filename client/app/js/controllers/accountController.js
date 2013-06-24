/**
 * AccountController
 */
define ([], function () {
  return ['$scope', '$http', 'balanced', 'user', 'facebook', function ($scope, $http, balanced, user, facebook) {
    $scope.marketplace = {}
    var cachedUser = user.getCachedUser ()
    if (_.isEmpty (cachedUser)) {
      facebook.loginWithFacebook (function (err, profile) {
        _.extend ($scope, profile)
        $scope.$apply ()
      })
    }
    _.extend ($scope, cachedUser)
    $scope.$apply;
    /*
     var marketplaceaccount = {
     cards_uri:data.cards_uri,
     created_at:data.created_at,
     credits_uri:data.credits_uri,
     debits_uri:data.debits_uri,
     email_address:data.email_address,
     holds_uri:data.holds_uri,
     id:data.id,
     meta:data.meta,
     name:data.name,
     refunds_uri:data.refunds_uri,
     roles:data.roles,
     transactions_uri:data.transactions_uri,
     uri:data.uri
     };
     */
    /*
     var bankaccount = {
     user_id: data.user_id,
     credits_uri: data.credits_uri,
     bank_name: data.bank_name,
     bank_code: data.bank_code,
     fingerprint: data.fingerprint,
     can_debit: data.can_debit,
     id: data.id,
     verifications_uri: data.verifications_uri,
     name: data.name,
     created_at: data.created_at,
     uri: data.uri,
     meta: data.meta,
     account_number: data.account_number,
     type: data.type
     };
     */
    /*
     var creditcard = {
     userid:data.userid,
     expiration_month:data.expiration_month,
     hash:data.hash,
     expiration_year:data.expiration_year,
     created_at:data.created_at,
     id:data.id,
     uri:data.uri,
     card_type:data.card_type,
     is_valid:data.is_valid,
     last_four:data.last_four,
     can_debit:data.can_debit,
     brand:data.brand
     };
     */

    $scope.getAccount = function () {
      balanced.get (false, function (marketplace) {
        $scope.marketplace = marketplace
      })
    }

    $scope.$apply ()
    $tabs = $ ('#accountTabs a')
    $tabs.click (function (e) {
      e.preventDefault ()
      $ (this).tab ('show')
    })
    $tabs.first ().tab ('show')
  }]
})