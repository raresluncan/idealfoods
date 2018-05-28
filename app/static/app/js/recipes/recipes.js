App.recipes.init = function () {
  App.recipes.hydrateRecipesData();
  App.recipes.setupRecipeModal();
  App.recipes.setupTable();
};

App.recipes.hydrateRecipesData = function() {
  App.api.getRecipesData().then(function(data) {
    App.recipesData = $.parseJSON(data);
  }).fail(function(data) {
    alert('Getting recipes failed!');
  });
};

App.recipes.updateIngredientsSection = function(ingredient) {
  $('.ingredients-section').append(App.recipes.createModalIngredient(ingredient));
};

App.recipes.updateNutrientsSection = function(
  ingredient,
  operation='add') {
  var field;
  var $progressData;
  var $progressValue;

  for (nutrient in ingredient.nutrient) {
    $progressData = $('.progress-data[data-name=' + nutrient + ']');
    if (operation == 'add') {
      App.recipes.nutrientsState[nutrient] += parseFloat(ingredient.nutrient[nutrient]);
    } else {
      App.recipes.nutrientsState[nutrient] -= parseFloat(ingredient.nutrient[nutrient]);
    }

    $progressData.find('.progress-value').text(
      App.prettifyFixedFloat(App.recipes.nutrientsState[nutrient]) + ' g'
    );

    var $progressBar = $progressData.find('.progress-bar');
    $progressBar.attr(
      'style', 'width: '
      + App.recipes.getNutrientPercentage(nutrient)
      +'%;'
    );

    var progressClass = App.recipes.getProgressBarClass(
      App.recipes.nutrientsState[nutrient]
    );

    $progressBar.attr('class', '').addClass('progress-bar ' + progressClass);
  }
}

App.recipes.setupRecipeModal = function() {
  var $ingredientData;

  $('.select-ingredients').on('changed.bs.select',
    function(e) {
      var targetId = $(e.target).val();
      var ingredient = App.recipesData["ingredients"]
        .find(ingredient => ingredient.id == targetId)
      if (ingredient && $('.ingredients-section').length != 0) {
        App.recipes.updateIngredientsSection(ingredient);
        App.recipes.updateNutrientsSection(ingredient);
        App.removeOptionFromSelect($(e.target), ingredient.id);
      } else {
        App.recipes.createIngredientsSection(ingredient);
      }
      App.refreshSelect($(e.target));
      App.initTooltips();
    }
  );

  $('.add-recipe-modal').on('click', '.icon-remove', function(e) {
    var ingredient = App.recipes.getIngredientById(($(e.target).data('id')));
    if (!ingredient) { return; }

    $(e.target).closest('.modal-section-content').remove();

    App.recipes.updateNutrientsSection(
        App.recipes.addedIngredients[ingredient.id], 'substract'
    );

    App.recipes.addedIngredients[ingredient.id];

    $('.select-ingredients .dropdown-menu .inner').append(
      App.recipes.createSelectListItem(ingredient)
    );

    $('.selectpicker.select-ingredients').append(
      App.recipes.createSelectListOption(ingredient)
    );

    if ($('.ingredients-data').length == 0) {
      $('.total-nutrients').remove();
      App.recipes.addedIngredients = {}
      App.recipes.nutrientsState = {
        'fibers': 0,
        'kcals': 0,
        'proteins': 0,
        'fats': 0,
        'carbohydrates': 0,
      };
    }
  });

  $('.add-recipe-modal').on('hide.bs.modal', function(e) {
    var ingredient;
    $('.ingredients-data').each(function(index, element) {
      ingredient = App.recipes.getIngredientById(
        $(element).find('.icon-remove').data('id')
      )

      $('.select-ingredients .dropdown-menu .inner').append(
        App.recipes.createSelectListItem(ingredient)
      );

      $('.selectpicker.select-ingredients').append(
        App.recipes.createSelectListOption(ingredient)
      );
    });
    $('.total-nutrients').remove();

    App.recipes.nutrientsState = {
      'fibers': 0,
      'kcals': 0,
      'proteins': 0,
      'fats': 0,
      'carbohydrates': 0,
    };
    App.recipes.addedIngredients = {}
  });

  $('.add-recipe-modal').on('click', '.recipe-ingredient-value', function(e) {
    var val = parseFloat($(e.target).text().split(' g')[0]);
    $ingredientData = $(e.target);

    // $('.glyphicon-remove-circle:visible').click();

    if (!val) { return; }

    var $input = $('<input>').attr('type', 'number').addClass('ingredient-input');
    $input.val(val);
    $(e.target).replaceWith($input);

    $input.closest('.text-center').append(
      App.createGlyphicon('glyphicon-ok glyphicon-ok-circle', 'Change')
    );

    $input.closest('.text-center').append(
      App.createGlyphicon('glyphicon-remove glyphicon-remove-circle', 'Cancel')
    );

    App.initTooltips();
  });

  $('.add-recipe-modal').on('click', '.glyphicon-remove-circle', function(e) {
    $(e.target).closest('.text-center').html('').append($ingredientData);
  });

  $('.add-recipe-modal').on('click', '.glyphicon-ok-circle', function(e) {
    var id = parseInt(
      $(e.target).closest('.ingredients-data').find('.icon-remove').data('id')
    );

    var inputValue = parseFloat(
      $(e.target).closest('.text-center').find('input').val()
    );

    var ingredient = App.recipes.getIngredientById(id);

    if (App.recipes.addedIngredients[ingredient.id]) {
      App.recipes.updateNutrientsSection(
        App.recipes.addedIngredients[ingredient.id],
        'substract'
      );
    } else {
      App.recipes.updateNutrientsSection(ingredient, 'substract');
    }

    var newNutrient = {
      'fibers': 0,
      'kcals': 0,
      'proteins': 0,
      'fats': 0,
      'carbohydrates': 0,
    }

    var oldValue;
    var keys = Object.keys(ingredient.nutrient);
    for (key in keys) {
      if (App.recipes.addedIngredients[ingredient.id]) {
        oldValue = parseInt(
          App.recipes.addedIngredients[ingredient.id].nutrient[keys[key]]
        )
      } else {
        oldValue = parseInt(
          ingredient.nutrient[keys[key]]
        );
      }

      newNutrient[keys[key]] =
        oldValue/parseFloat($ingredientData.text().split(' g')[0]) * inputValue;
    }

    var newIngredient = Object.assign({}, ingredient)

    newIngredient.nutrient = newNutrient;

    App.recipes.addedIngredients[ingredient.id] = newIngredient;
    App.recipes.updateNutrientsSection(newIngredient);

    $ingredientData.text(App.prettifyFixedFloat(inputValue) + ' g');

    var $targetIngredient = $(e.target).closest('.text-center');
    $targetIngredient.html('');
    $targetIngredient.append($ingredientData);
  });
};

App.recipes.setupTable = function() {
  $('.app-table').on('click', '.icon-edit', function(e) {
    var objectId = $(e.target).closest('.table-row').data('object-id');
    var recipe = App.recipes.getRecipeById(parseInt(objectId));

    $('.add-recipe-modal').modal('show');
    $('.modal-title').text('Edit recipe');

    if (!recipe) { return; }

    if (recipe.ingredients.length == 1) {
      App.recipes.createIngredientsSection(recipe.ingredients[0]);
      App.removeOptionFromSelect(
        $('.selectpicker.select-ingredients'),
        recipe.ingredients[0].id
      );
      App.initTooltips();
      return;
    }

    var createdSection = false;
    var ingredient;

    for (ingredientIndex in recipe.ingredients) {
      ingredient = recipe.ingredients[ingredientIndex];
      if (!createdSection) {
        App.recipes.createIngredientsSection(ingredient);
        createdSection = true;
      } else {
        App.recipes.updateIngredientsSection(ingredient);
        App.recipes.updateNutrientsSection(ingredient);
      }
      App.removeOptionFromSelect(
        $('.selectpicker.select-ingredients'),
        ingredient.id
      );
    }
    App.refreshSelect($('.selectpicker.select-ingredients'));
    $('.selectpicker.select-ingredients').selectpicker('toggle');
    App.initTooltips();
  });
}

$(document).ready(App.recipes.init);