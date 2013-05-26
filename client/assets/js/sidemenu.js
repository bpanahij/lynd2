$ (document).ready (function () {
  var $menuLeft = $ ('#cbp-spmenu-s1');
  var $showLeftPush = $ ('#menu-button');
  var $body = $ ('body');
  $showLeftPush.click (function () {
    $(this).toggleClass ('active');
    $body.toggleClass ('cbp-spmenu-push-toright');
    $menuLeft.toggleClass ('cbp-spmenu-open');
  });
})

var myScroll;
function loaded () {
  myScroll = new iScroll ('wrapper', { checkDOMChanges: true });
}
document.addEventListener ('touchmove', function (e) {
  e.preventDefault ();
}, false);
document.addEventListener ('DOMContentLoaded', loaded, false);