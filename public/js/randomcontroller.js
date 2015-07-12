var app = angular.module('app', ['smart-table']);

app.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals) + '%';
  };
}]);

app.controller('sortCtrl', ['$scope', '$http', function (scope, http) {
  scope.threshold = 2;
  var parts = window.location.pathname.split('/');
  var repo = parts[parts.length - 2] + "/" + parts[parts.length - 1];

  http.get("/res/repos/" + repo).then(function(response) {

    var raw_users = response.data;
    scope.users = [];

    for (var username in raw_users) {
      var user = {
        "name": username
      };

      user.commits
      = raw_users[username].subject_limit.pass
      + raw_users[username].subject_limit.fail
      + raw_users[username].subject_limit.undef

      user.subject_limit = raw_users[username].subject_limit;
      user.subject_limit.rate
      = user.subject_limit.pass
      / user.commits;

      user.capitalize_subject = raw_users[username].capitalize_subject;
      user.capitalize_subject.rate
      = user.capitalize_subject.pass
      / user.commits;

      user.no_period_subject = raw_users[username].no_period_subject;
      user.no_period_subject.rate
      = user.no_period_subject.pass
      / user.commits;

      user.imperative_subject = raw_users[username].imperative_subject;
      user.imperative_subject.rate
      = user.imperative_subject.pass
      / user.commits;

      user.body_used = raw_users[username].body_used;
      user.body_used.rate
      = user.body_used.pass
      / user.commits;

      user.body_limit = raw_users[username].body_limit;
      if (user.body_used.pass > 0) {
        user.body_limit.rate
        = user.body_limit.pass
        / user.body_used.pass;
      } else {
        user.body_limit.rate = 0;
      }

      user.empty_second_line = raw_users[username].empty_second_line;
      if (user.body_used.pass > 0) {
        user.empty_second_line.rate
        = user.empty_second_line.pass
        / user.body_used.pass;
      } else {
        user.empty_second_line.rate = 0;
      }

      user.rating = average([
        user.subject_limit.rate,
        user.capitalize_subject.rate,
        user.no_period_subject.rate,
        user.imperative_subject.rate,
        user.body_used.rate,
        user.body_limit.rate,
        user.empty_second_line.rate
      ],
      [
        1, 1, 1, 1, 1, user.body_used.rate, user.body_used.rate
      ]);

      scope.users.push(user);
    }

    scope.users_safe = [].concat(scope.users);

    console.dir(response.data);
    console.dir(scope.users);
  });
}]);

function sum(numeric_array) {
  var s = 0;
  for (var i = 0; i < numeric_array.length; i++){
    s += numeric_array[i];
  }
  return s;
}

function average(numeric_array, weights) {
  var s = 0;
  for (var i = 0; i < numeric_array.length; i++){
    s += weights[i] * numeric_array[i];
  }
  return s / sum(weights);
}
