App.ingredients = {}

App.ingredients.init = function () {
  App.ingredients.setupAddIngredientModal();
  App.ingredients.setupDeleteIngredient();
  App.ingredients.setupEditIngredient();
};

/**
 * @param {Array} data
 * @param {String}} animatedClass
 */
App.ingredients.buildIngredientRow = function(data, animatedClass) {
  var $row = $('<div>').addClass('container table-row row vertical-align');
  $row.attr("data-object-id", data.ingredient.id);

  if (animatedClass) {
    $row.addClass(animatedClass);
  }
  var $nameCol = $('<div>').addClass('table-col table-data-left col-sm-6');
  $nameCol.append(data.ingredient.name);
  $nameCol.attr('data-name', 'name');

  $row.append($nameCol);

  var nutrient;
  var $ingredientCol;
  var $nutrientColumns = []
  for (nutrient in data.ingredient.nutrient) {
    $ingredientCol = $('<div>').addClass('table-col table-data-center col-sm-1');
    $ingredientCol.append(parseFloat(data.ingredient.nutrient[nutrient]));
    $ingredientCol.attr('data-name', nutrient);
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
        debugger;
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
    App.restoreOriginalTableRowClass($row);
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
  var $editIcon;
  var objectId;
  $('.app-table.ingredients-table').on('click', '.icon-edit', function(e) {
    $('.icon-edit-cancel:visible').click();
    $(e.target).tooltip('hide')
    $row = $(e.target).closest('.table-row');
    objectId = $row.data('object-id');
    $row.addClass('animated fadeOut');
    $row.find('.table-col').each(function(index, element) {
      if ($(element).data('name')) {
        data[$(element).data('name')] = $(element).html().replace( /\s/g, '');
      }
    });
    var $editRow = $('.table-edit-row').clone();
    $editRow.attr('data-object-id', objectId);
    $editRow.find("[data-tooltip='tooltip']").tooltip('enable');
    App.ingredients.populateEditTableRow($editRow, data);
    $row.replaceWith($editRow);
    $editRow.addClass('animated fadeIn').show();
    App.restoreOriginalTableRowClass($row);
  });

  $('.app-table.ingredients-table').on('click', '.icon-edit-ok', function(e) {
    var $editRow = $(e.target).closest('.table-edit-row');
    var $editIngredientForm = $editRow.find('form');
    App.api.editIngredient($editIngredientForm.serialize(), objectId)
      .then(function(data) {
        var $row = App.ingredients.buildIngredientRow(
          data,
          'animated fadeIn'
        );
        $editRow.addClass('animated FadeOut')
        $editRow.replaceWith($row);
        $row.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
          function(e) {
            App.restoreOriginalTableRowClass($(e.target));
        });
      }).fail(function(data) {
        App.generateTableRowFormErrorsAndSuccess(
          $editRow,
          JSON.parse(data.responseText).errors
        );
      });
  });

  $('.app-table.ingredients-table').on('click', '.icon-edit-cancel', function(e) {
    var $editRow = $(e.target).closest('.table-row');
    App.restoreOriginalTableRowClass($editRow);
    $editRow.addClass('animated fadeOut');
    App.destroyAllTableEditRowPopovers($editRow);
    $editRow.replaceWith($row);
    App.restoreOriginalTableRowClass($row);
    $row.addClass('animated fadeIn');
    $row.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
      function(e) {
        App.restoreOriginalTableRowClass($row);
    });
    $row.find("[data-tooltip='tooltip']").tooltip('enable');
  });
};

$(document).ready(App.ingredients.init);