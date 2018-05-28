App.recipes.createTotalNutrients = function() {
  var $totalNutrients = $('<div>').addClass('total-nutrients');
  $('.add-recipe-modal .modal-body').append($totalNutrients);

  return $totalNutrients;
};

App.recipes.createModalSection = function(sectionTitle) {
  return $('<div>').addClass('modal-section').text(sectionTitle);
};

App.recipes.createIngredientsSection = function(ingredient) {
  var $totalNutrients = App.recipes.createTotalNutrients();
  var $ingrdientsSection = $('<div>').addClass('ingredients-section');
  $ingrdientsSection.append(App.recipes.createModalSection(
    'Ingredients for this recipe:'
  ));
  $ingrdientsSection.append(App.recipes.createModalIngredient(ingredient));
  $totalNutrients.append($ingrdientsSection);
  App.recipes.createNutrientsSection(ingredient, $totalNutrients);
};

App.recipes.createNutrientsSection = function(ingredient, $totalNutrients) {
  var $nutrientsSection = $('<div>').addClass('nutrients-section');
  $nutrientsSection.append(App.recipes.createModalSection(
    'Nutrients for this recipe:'
  ));
  App.recipes.createModalNutrients(ingredient, $nutrientsSection);
  $totalNutrients.append($nutrientsSection);
};

App.recipes.createModalNutrients = function(ingredient, $nutrientsSection) {
  var value;
  var nutrients = ["kcals", "proteins", "carbohydrates", "fats", "fibers"];
  var nutrientName;

  for (nutrientId in nutrients) {
    nutrientName = nutrients[nutrientId];
    value = ingredient.nutrient[nutrientName];

    App.recipes.nutrientsState[nutrientName] += parseFloat(value);
    var $progressData = $('<div>').addClass('progress-data row');
    var $col = $('<div>').addClass('col-xs-3');
    if (nutrientName == 'carbohydrates') {
      $col.append(
        $('<div>').addClass('progress-title text-center').append('carbs')
      );
    } else {
      $col.append(
        $('<div>').addClass('progress-title text-center').append(nutrientName)
      );
    }

    $progressData.append($col);

    $col = $('<div>').addClass('col-xs-3 text-center');
    $col.append(
      $('<div>').addClass('progress-value text-center').append(
        App.recipes.nutrientsState[nutrientName] + ' g'
      )
    );
    $progressData.append($col);

    $progressData.attr('data-name', nutrientName);

    $col = $('<div>').addClass('col-xs-5 center-block');

    var $progress = $('<div>').addClass('progress progress-nutrients');
    var $progressBar = $('<div>').addClass('progress-bar progress-bar-default');

    if (nutrientName == 'kcals') {
      $progressBar.attr('role', 'progressbar')
        .attr('aria-valuenow', App.recipes.nutrientsState[nutrientName])
        .attr('aria-valuemin', 0).attr('aria-valuemax', 10000);
    } else {
      $progressBar.attr('role', 'progressbar')
        .attr('aria-valuenow', App.recipes.nutrientsState[nutrientName])
        .attr('aria-valuemin', 0).attr('aria-valuemax', 1000);
    }

    if (nutrientName == 'kcals') {
      var width = value/10000 * 100;
    } else {
      var width = value/1000 * 100;
    }

    var style = width > 100 ?
      "width:100%" :
      "width:" + App.recipes.getNutrientPercentage(nutrientName) + "%";

    $progressBar.attr('style', style);

    $progressBar.attr('class', '').addClass(
      'progress-bar '
      + App.recipes.getProgressBarClass(parseFloat(value))
    );

    $progress.append($progressBar);
    $col.append($progress);
    $progressData.append($col);
    $nutrientsSection.append($progressData);
  }

  return $progressData
};

App.recipes.createModalIngredient = function(ingredient) {
  var $sectionContent = $('<div>').addClass('modal-section-content center-block');
  var $ingredientDataRow = $('<div>').addClass('ingredients-data row');

  var $titleCol = $('<div>').addClass('col-xs-4 text-center');
  var $recipeIngredientTitle = $('<div>').addClass('recipe-ingredient-title')
    .text(ingredient.name);
  $titleCol.append($recipeIngredientTitle);
  $ingredientDataRow.append($titleCol);

  var $ingredientQuantityCol = $('<div>').addClass('col-xs-6 text-center');
  var $recipeIngredientValue = $('<div>').addClass('recipe-ingredient-value')
    .text('100 g');
  $ingredientQuantityCol.append($recipeIngredientValue);
  $ingredientDataRow.append($ingredientQuantityCol);

  var $removeCol = $('<div>').addClass('col-xs-2 text-center');
  var $removeIcon = $('<span>')
    .addClass('glyphicon glyphicon-remove icon-remove')
    .attr('data-tooltip', 'tooltip')
    .attr('title', 'Remove')
    .attr('data-original-title', 'Remove')
    .attr('data-id', ingredient.id);
  $removeCol.append($removeIcon);
  $ingredientDataRow.append($removeCol);

  $sectionContent.append($ingredientDataRow);

  App.removeOptionFromSelect(
    $('.selectpicker.select-ingredients'),
    ingredient.id
  );

  App.recipes.addedIngredients[ingredient.id] = ingredient;
  
  return $sectionContent;
};

App.recipes.createSelectListOption = function(ingredient) {
  var $option = $('<option>').attr('data-tokens', ingredient.name)
    .attr('value', ingredient.id)
    .text(ingredient.name);

  return $option;
};

App.recipes.createSelectListItem = function(ingredient) {
  var maxIndex = parseInt(
    $('.select-ingredients .dropdown-menu.inner li:last-child')
      .attr('data-original-index')
  ) + 1;

  if ( !maxIndex ) {
    maxIndex = 0;
  }

  var $listItem = $('<li>').attr('data-original-index', maxIndex);
  var $href = $('<a>').attr('tabindex', 0).attr('class', '')
    .attr('data-tokens', ingredient.name)
    .attr('role', 'option')
    .attr('aria-disabled', false).attr('aria-selected', false);
  var $span = $('<span>').addClass('text').text(ingredient.name);
  $href.append($span);

  $span = $('<span>').addClass('glyphicon glyphicon-ok check-mark');
  $href.append($span);
  $listItem.append($href);

  return $listItem;
};