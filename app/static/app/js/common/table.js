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