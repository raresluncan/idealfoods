App.api = {};

/**
 * @param {XMLHttpRequest} xhr
 */
App.api.addCsrfToRequestHeader = function(xhr) {
  xhr.setRequestHeader('X-CSRFToken', App.getCookie('csrftoken'));
};

/**
 * @param {String} url
 * @param {Array} serializedFormData
 * @return {Promise}
 */
App.api.postForm = function(url, serializedFormData) {
  return $.ajax({
    type: 'POST',
    url: url,
    dataType: 'json',
    data: serializedFormData,
    beforeSend: App.api.addCsrfToRequestHeader
  });
};

/**
 * @param {String} url
 * @return {Promise}
 */
App.api.delete = function(url) {
  return $.ajax({
    type: 'DELETE',
    url: url,
    beforeSend: App.api.addCsrfToRequestHeader
  });
};

/**
 * @param {String} url
 * @return {Promise}
 */
App.api.post = function(url) {
  return $.ajax({
    type: 'POST',
    url: url,
    dataType: 'json',
    beforeSend: App.api.addCsrfToRequestHeader
  });
};

/**
 * @param {Array} addIngredientFormData
 * @return {Promise}
 */
App.api.addIngredient = function(addIngredientFormData) {
  var url = '/ingredients/create/';

  return App.api.postForm(url, addIngredientFormData);
};

/**
 * @param {Number} ingredientId
 * @return {Promise}
 */
App.api.deleteIngredient = function(ingredientId) {
  var url = '/ingredients/' + ingredientId + '/delete/';

  return App.api.delete(url);
}

App.api.editIngredient = function($editIngredientFormData, ingredientId) {
  var url = '/ingredients/' + ingredientId + '/edit/';

  return App.api.postForm(url, $editIngredientFormData);
}