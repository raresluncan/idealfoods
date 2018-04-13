App.api = {};

/**
 * @param {XMLHttpRequest} xhr
 */
App.api.addCsrfToRequestHeader = function(xhr) {
  xhr.setRequestHeader('X-CSRFToken', App.getCookie('csrftoken'));
}

/**
 * @param {String} url
 * @param {Array} serializedFormData
 * @return {Promise}
 */
App.api.postForm = function(url, serializedFormData) {
  debugger;
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
App.api.post = function(url) {
  return $.ajax({
    type: 'POST',
    url: url,
    dataType: 'json',
    beforeSend: App.api.addCsrfToRequestHeader
  });
}

/**
 * @param {Array} addIngredientFormData
 * @return {Promise}
 */
App.api.addIngredient = function(addIngredientFormData) {
  var url = '/ingredients/create/';

  return App.api.postForm(url, addIngredientFormData);
};