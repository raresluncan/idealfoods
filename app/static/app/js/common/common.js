var App = {}

App.init = function() {
  App.initTooltips();
  App.setupPopoverResize();
  App.setupNavbar();
};

App.setupNavbar = function() {
  var url = window.location;
  $('ul.nav a[href="'+ url +'"]').parent().addClass('active');
  $('ul.nav a').filter(function() {
      return this.href == url;
  }).parent().addClass('active');
}

App.setupPopoverResize = function() {
  $(window).on('resize', function () {
    $(".form-group.popover-error.has-error").popover('show');
  });
};

App.initTooltips = function() {
  $('[data-tooltip="tooltip"]').tooltip();
};

App.hideTooltips = function() {
  $('[data-tooltip="tooltip"]').tooltip('hide');
};

/**
 * @param {String} name
 * @return {String}
 */
App.getCookie = function (name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(
                  cookie.substring(name.length + 1)
                );
                break;
            }
        }
    }

    return cookieValue;
};

/**
 * @param {jQuery} $form
 * @param {Array} errors
 */
App.generateBootstrapFormErrorsAndSuccess = function($form, errors) {
  $form.find('.form-group').each(function(index, element){
    var $formGroupElement = $(element);
    var elementInputName = $formGroupElement.find('input, textarea, select')
      .attr('name');
    $formGroupElement.find('.help-block').remove();

    if (errors[elementInputName]) {
      $formGroupElement.addClass('has-error');
      $formGroupElement.append(
        $('<div>').addClass('help-block').html(errors[elementInputName])
      );
    } else {
      $formGroupElement.addClass('has-success').removeClass('has-error');
    }
  });
};


/**
 * @param {jQuery} $formParent
 */
App.clearBootstrapForm = function ($formParent) {
  $formParent.find('.form-group').each(function(index, element){
    var $element = $(element);
    $element.removeClass('has-error has-success');
    $element.find('.help-block').remove();
    if ($element.find('input, textarea, select').attr('name') != 'user') {
      $element.find('input, textarea, select').val('');
    }
  });
};

/**
 * @param {jQuery} $tableRow
 */
App.restoreOriginalTableRowClass = function($tableRow) {
  $tableRow.attr('class', 'container table-row row vertical-align');
}

/**
 * @param {jQuery} $trow
 */
App.destroyAllTableEditRowPopovers = function($row) {
  $row.find('.form-group.has-error').each(function(index, element) {
    $(element).popover('destroy');
  });
}

/**
 * @param {jQuery} $select
 */
App.refreshSelect = function($select) {
  $select.selectpicker('val', '');
  $select.selectpicker('refresh');
  $select.selectpicker('toggle');
  $('.btn.dropdown-toggle.bs-placeholder').blur();
}

/**
 * @param {jQuery} $select
 * @param {Number} $optionId
 */
App.removeOptionFromSelect = function($select, optionId) {
  $select.find('option[value=' + optionId + ']').remove();
}

/**
 * @param {Number} value
 * @return {Number}
 */
App.prettifyFixedFloat = function(value) {
  if (parseInt(value) == parseFloat(value)) {
    return value;
  }
  return parseFloat(value).toFixed(2);
}

/**
 * @param {String} iconType
 * @return {jQuery}
 */
App.createGlyphicon = function(iconClass, tootlipText=null) {
  if (!tootlipText) {
    return $('<span>').addClass('glyphicon ' + iconClass);
  }

  return $('<span>').addClass('glyphicon ' + iconClass)
    .attr('data-tooltip', 'tooltip')
    .attr('title', tootlipText)
    .attr('data-original-title', tootlipText)
};