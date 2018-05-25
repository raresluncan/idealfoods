App.recipes = {}

App.recipesData = {};


App.recipes.init = function () {
  App.recipes.hydrateRecipesData();
  App.recipes.setupRecipeModal();
};

App.recipes.hydrateRecipesData = function() {
  App.api.getRecipesData().then(function(data) {
    App.recipesData = $.parseJSON(data);
  }).fail(function(data) {
    debugger;
  });
};

App.recipes.createModalSection = function(sectionTitle) {
  return $('<div>').addClass('modal-section').text(sectionTitle);
};

App.recipes.createModalIngredient = function(ingredient) {
  var $sectionContent = $('<div>').addClass('modal-section-content center-block');
  var $ingredientDataRow = $('<div>').addClass('ingredients-data row');

  var $titleCol = $('<div>').addClass('col-xs-4 text-center');
  var $recipeIngredientTitle = $('<div>').addClass('recipe-ingredient-title')
    .text(ingredient.name);
  $titleCol.append($recipeIngredientTitle);
  $ingredientDataRow.append($titleCol);

  var $ingredientQuantityCol = $('<div>').addClass('col-xs-4 text-center');
  var $recipeIngredientValue = $('<div>').addClass('recipe-ingredient-value')
    .text('100 g');
  $ingredientQuantityCol.append($recipeIngredientValue);
  $ingredientDataRow.append($ingredientQuantityCol);

  var $removeCol = $('<div>').addClass('col-xs-4 text-center');
  var $removeIcon = $('<span>')
    .addClass('glyphicon glyphicon-remove icon-remove')
    .attr('data-tooltip', 'tooltip')
    .attr('title', 'Remove');
  $removeCol.append($removeIcon);
  $ingredientDataRow.append($removeCol);

  $sectionContent.append($ingredientDataRow);

  return $sectionContent;
}

App.recipes.createIngredientsSection = function(ingredient) {
  var $ingrdientsSection = $('<div>').addClass('ingrediens-section');
  $ingrdientsSection.append(App.recipes.createModalSection(
    'Ingredients for this recipe:'
  ));
  $ingrdientsSection.append(App.recipes.createModalIngredient(ingredient));
};

App.recipes.updateIngredientsSection = function(ingredient) {
  $('.ingrediens-section').append(App.recipes.createModalIngredient(ingredient));
};

App.recipes.createNutrientsSection = function(ingredient) {
  var $nutrientsSection = $('<div>').addClass('nutrients-section');
  $nutrientsSection.append(App.recipes.createModalSection(
    'Nutrients for this recipe:'
  ));
  $nutrientsSection.append(App.recipes.createModalNutrient(ingredient));
};

App.recipes.createModalNutrient = function(field, value) {
  var $progressData = $('<div>').addClass('progress-data row');

  var $col = $('<div>').addClass('col-xs-3');
  $col.append(
    $('<div>').addClass('progress-title text-center').append(field)
  );
  $progressData.append($col);

  $col = $('<div>').addClass('col-xs-3 text-center');
  $col.append(
    $('<div>').addClass('progress-title text-center').append(value)
  );
  $progressData.append($col);

  $col = $('<div>').addClass('col-xs-5 center-block');

  var $progress = $('<div>').addClass('progress progress-nutrients');
  var $progressBar = $('<div>').addClass('progress-bar progress-bar-default');
  $progressBar.attr('role', 'progressbar').attr('aria-valuenow', value)
    .attr('aria-valuemin', 0).attr('aria-valuemax', 1000)

  var width = value/1000 * 100;

  var style = width > 100 ? "width:100%" : "width:" + value +"%";

  $progressBar.attr('style', style);
  $progress.append($progressBar);
  $col.append($progress);
  $progressData.append($col);

  return $progressData
};

App.recipes.setupRecipeModal = function() {
  $('.select-ingredients').on('changed.bs.select',
    function(e) {
        var tragetId = $(e.target).val();
        var ingredient = App.recipesData['ingredients']
          .find((ingredient, targetId) => ingredient.id === targetId);
        if (ingredient) {
          App.recipes.updateIngredientsSection(ingredient);
        }
    }
  );
};

$(document).ready(App.recipes.init);