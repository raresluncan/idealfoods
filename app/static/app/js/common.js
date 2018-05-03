var App = {}

App.init = function() {
  App.initTooltips();
  App.setupPopoverResize();
};

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
 * @param {jQuery} $row
 * @param {Array} errors
 */
App.generateTableRowFormErrorsAndSuccess = function($row, errors) {
  $row.find('.form-group').each(function(index, element){
    var $formGroupElement = $(element);
    var elementInputName = $formGroupElement.find('input, textarea, select')
      .attr('name');

    if (errors[elementInputName]) {
      $formGroupElement.addClass('has-error');
      App.activateTableRowErrorPopover(
        $formGroupElement, errors[elementInputName]
      );

    } else {
      $formGroupElement.addClass('has-success').removeClass('has-error');
    }
  });
};

App.activateTableRowErrorPopover = function($elementWithPopover, error) {
  $elementWithPopover.popover({
    template: App.getTableRowErrorPopoverTemplate().prop('outerHTML'),
    content: App.getErrorContentForTableRowErrorPopover(error),
    placement: 'top',
    animation: false,
    html: true,
    trigger: 'focus',
    container: 'body'
  }).popover('show');
}

App.getErrorContentForTableRowErrorPopover = function(error_message) {
  var $span = $('<span>').addClass('popover-error-text')
  $span.append(error_message);
  return $span
}

App.getTableRowErrorPopoverTemplate = function() {
  var $popoverTemplate = $('<div>').addClass('popover table-edit-row-error-popover');
  var $popoverTitle = $('<h3>').addClass('popover-title')
  $popoverTemplate.attr('role', 'tooltip');

  var $arrow = $('<div>').addClass('arrow');
  var $popoverBody = $('<div>').addClass('popover-content center');

  $popoverTemplate.append($arrow)
  $popoverTemplate.append($popoverBody);

  return $popoverTemplate
}


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

App.destroyAllTableEditRowPopovers = function($row) {
  $row.find('.form-group.has-error').each(function(index, element) {
    $(element).popover('destroy');
  });
}

$(document).ready(App.init)