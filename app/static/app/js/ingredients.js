App.ingredients = {}

App.ingredients.init = function () {
  App.ingredients.setupAddIngredientModal();
}

/**
 * @param {Array} data
 */
App.ingredients.buildIngredientRow = function(data, animatedClass) {
  var $row = $('<div>').addClass('container table-row row vertical-align');
  if (animatedClass) {
    $row.addClass(animatedClass);
  }
  var $nameCol = $('<div>').addClass('table-col table-data-left col-sm-6');
  $nameCol.append(data.ingredient.name);

  $row.append($nameCol);

  var nutrient;
  var $ingredientCol;

  for (nutrient in data.ingredient.nutrient) {
    $ingredientCol = $('<div>').addClass('table-col table-data-center col-sm-1');
    $ingredientCol.append(data.ingredient.nutrient[nutrient]);
    $row.append($ingredientCol);
  }

  var $actionsCol = $('<div>').addClass('table-col table-data-center col-sm-1')
    .append(data.ingredient_actions);

  $row.append($actionsCol);

  return $row;
}

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
}

$(document).ready(App.ingredients.init)