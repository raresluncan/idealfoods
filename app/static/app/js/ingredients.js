App.ingredients = {}

App.ingredients.init = function () {
  App.ingredients.setupAddIngredientModal();
}

App.ingredients.setupAddIngredientModal = function() {
  $('.add-ingredient-submit').on('click', function(e) {
    App.api.addIngredient($('.add-ingredient-form').serialize())
      .then(function(data) {

      }).fail(function(data) { console.log(data) });
  });
}

$(document).ready(App.ingredients.init)