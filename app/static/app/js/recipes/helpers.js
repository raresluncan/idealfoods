App.recipes.getProgressBarClass = function(value, field) {
  if (field == 'kcals') {
    if (value <= 500) {return 'progress-bar-success'}
    if (value <= 1000) {return 'progress-bar-warning'}
    if (value > 1000 ) {return 'progress-bar-danger'};
  }

  if (value <= 150) {return 'progress-bar-success'}
  if (value <= 450) {return 'progress-bar-warning'}
  if (value > 450 ) {return 'progress-bar-danger'};

  return 'progress-bar-info';
};

App.recipes.getNutrientPercentage = function(nutrient) {
  var maxVal = 1000;
  if (nutrient == 'kcals') {
    maxVal = 2000;
  }
  var value = App.recipes.nutrientsState[nutrient];
  var finalValue = parseInt(value)/maxVal * 100;
  return finalValue < 100 ? finalValue : 100;
}

App.recipes.getIngredientById = function(ingredientId) {
  for (ingredient in App.recipesData['ingredients']) {
    if (App.recipesData['ingredients'][ingredient].id == ingredientId) {
      return App.recipesData['ingredients'][ingredient];
    }
  }

  return null;
};

App.recipes.getRecipeById = function(recipeId) {
  for (recipe in App.recipesData['recipes']) {
    if (App.recipesData['recipes'][recipe].id == recipeId) {
      return App.recipesData['recipes'][recipe];
    }
  }

  return null;
};