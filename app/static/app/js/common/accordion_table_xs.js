$(function() {
  var isXS = false;
  var $accordionXSCollapse = $('.accordion-xs-collapse');

  // Window resize event (debounced)
  var timer;
  $(window).resize(function () {
      if (timer) { clearTimeout(timer); }
      timer = setTimeout(function () {
          isXS = Modernizr.mq('only screen and (max-width: 767px)');

          // Add/remove collapse class as needed
          if (isXS) {
              $accordionXSCollapse.addClass('collapse');
          } else {
              $accordionXSCollapse.removeClass('collapse');
          }
      }, 100);
  }).trigger('resize'); //trigger window resize on pageload

    // Initialise the Bootstrap Collapse
  $accordionXSCollapse.each(function () {
      $(this).collapse({ toggle: false });
  });

  // <a href="https://www.jqueryscript.net/accordion/">Accordion</a> toggle click event (live)
  $(document).on('click', '.accordion-xs-toggle', function (e) {

      var $thisToggle = $(this);
      var $targetRow = $thisToggle.closest('.row');
      var $targetCollapse = $targetRow.find('.accordion-xs-collapse');

      if (isXS && $targetCollapse.length) {
          var $siblingRow = $targetRow.siblings('.row');
          var $siblingToggle = $siblingRow.find('.accordion-xs-toggle');
          var $siblingCollapse = $siblingRow.find('.accordion-xs-collapse');

          $targetCollapse.collapse('toggle'); //toggle this collapse
          $siblingCollapse.collapse('hide'); //close siblings

          $thisToggle.addClass('collapse'); //class used for icon marker
          $siblingToggle.removeClass('collapse'); //remove sibling marker class
      }
  });
});