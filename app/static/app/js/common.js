var App = {}

App.init = function() {
  App.initTooltips();
};

App.initTooltips = function() {
  $('[data-tooltip="tooltip"]').tooltip();
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

$(document).ready(App.init)