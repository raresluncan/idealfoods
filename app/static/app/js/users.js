App.users = {}

App.users.init = function() {
  App.initTooltips();
  App.users.setupUsersTable();
};

App.users.setupUsersTable = function() {
  $('.app-table').on('click', '.icon-details', function(e) {
    var userId = $(e.target).closest('.table-row').data('object-id');
    window.location.replace('/users/' + userId);
  });
}

$(document).ready(App.users.init);