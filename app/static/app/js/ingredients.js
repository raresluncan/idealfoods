App.ingredients = {}

App.ingredients.init = function () {
  App.ingredients.setupAddIngredientModal();
  App.ingredients.setupDeleteIngredient();
  App.ingredients.setupEditIngredient();
};

/**
 * @param {Array} data
 */
App.ingredients.buildIngredientRow = function(data, animatedClass) {
  var $row = $('<div>').addClass('container table-row row vertical-align');
  $row.attr("data-object-id", data.ingredient.id);

  if (animatedClass) {
    $row.addClass(animatedClass);
  }
  var $nameCol = $('<div>').addClass('table-col table-data-left col-sm-6');
  $nameCol.append(data.ingredient.name);

  $row.append($nameCol);

  var nutrient;
  var $ingredientCol;
  var $nutrientColumns = []
  for (nutrient in data.ingredient.nutrient) {
    $ingredientCol = $('<div>').addClass('table-col table-data-center col-sm-1');
    $ingredientCol.append(data.ingredient.nutrient[nutrient]);
    $nutrientColumns[nutrient] = $ingredientCol;
  }

  $row.append($nutrientColumns['kcals']);
  $row.append($nutrientColumns['proteins']);
  $row.append($nutrientColumns['carbohydrates']);
  $row.append($nutrientColumns['fats']);
  $row.append($nutrientColumns['fibers']);

  var $actionsCol = $('<div>').addClass('table-col table-data-center col-sm-1')
    .append(data.ingredient_actions);

  $row.append($actionsCol);

  return $row;
};

App.ingredients.setupAddIngredientModal = function() {
  $('.add-ingredient-submit').on('click', function(e) {
    var $addIngredientForm = $('.add-ingredient-form')
    App.api.addIngredient($addIngredientForm.serialize())
      .then(function(data) {
        var $ingredientRow = App.ingredients.buildIngredientRow(
          data,
          'animated bounceInLeft'
        );
        $('.app-table .table-body').append($ingredientRow);
        App.initTooltips();
        $('.add-ingredient-modal').modal('hide');
      }).fail(function(data) {
        App.generateBootstrapFormErrorsAndSuccess(
          $addIngredientForm,
          JSON.parse(data.responseText).errors
        );
      });
  });

  $('.add-ingredient-modal').on('hidden.bs.modal', function() {
    App.clearBootstrapForm($('.add-ingredient-form'));
  });
};

App.ingredients.setupDeleteIngredient = function() {
  $('.app-table.ingredients-table').on('click', '.icon-remove', function(e) {
    var $row = $(e.target).closest('.table-row');
    $row.removeClass('animated rubberBand');
    var ingredientId = $row.data('object-id');

    App.api.deleteIngredient(ingredientId).then(function(data) {
      $row.addClass('animated bounceOutLeft');
      $row.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
        function(e) {
        $row.remove();
      });

    }).fail(function(data) {
      $row.addClass('animated rubberBand');
    });
  });
};

App.ingredients.populateEditTableRow = function($row, data) {
  $row.find('.table-col input').each(function(index, element) {
    if ($(element).attr('type') == 'text') {
      $(element).val(data[$(element).attr('name')]);
    }

    if ($(element).attr('type') == 'number') {
      $(element).val(parseFloat(data[$(element).attr('name')]));
    }
  });
}

App.ingredients.setupEditIngredient = function() {
  var data = {};
  var $row;
  $('.app-table.ingredients-table').on('click', '.icon-edit', function(e) {
    $row = $(e.target).closest('.table-row');
    $row.find('.table-col').each(function(index, element) {
      if ($(element).data('name')) {
        data[$(element).data('name')] = $(element).html().replace( /\s/g, '');
      }
    });
    var $editRow = $('.table-edit-row').clone();
    App.ingredients.populateEditTableRow($editRow, data);
    $row.replaceWith($editRow);
    $editRow.show();
  });

  $('.app-table.ingredients-table').on('click', '.icon-edit-cancel', function(e) {
    var $editRow = $(e.target).closest('.table-row');
    $editRow.replaceWith($row);
  });
};

$(document).ready(App.ingredients.init);