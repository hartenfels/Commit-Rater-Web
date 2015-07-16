var app = angular.module('app', ['smart-table']);

app.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals) + '%';
  };
}]);

app.controller('sortCtrl', ['$scope', '$http', '$timeout', function (scope, http, timeout) {
  scope.status = 0;

  scope.threshold = 5;
  var parts = window.location.pathname.split('/');
  scope.repo = parts[parts.length - 2] + "/" + parts[parts.length - 1];
  scope.repo_url = "https://github.com/" + scope.repo;

  function bump() {
    http.get("/res/repos/" + scope.repo)
    .success(function(data, status, headers, config) {
      if (status == 202) {
        scope.status = 202;
        var delay = 10000;
        console.dir(data);
        console.log("Trying again in " + delay + "ms");
        timeout(bump, delay);
      } else {


        //console.dir(response.data);

        var raw_users = data;
        scope.users = [];

        for (var username in raw_users) {
          var user = {
            "name": username
          };

          user.commits
              = raw_users[username].subject_limit.pass
              + raw_users[username].subject_limit.fail
              + raw_users[username].subject_limit.undef

          // Rules
          user.subject_limit = raw_users[username].subject_limit;
          user.subject_limit.desc = "subject_limit"
          user.subject_limit.rate
              = user.subject_limit.pass
              / user.commits;

          user.capitalize_subject = raw_users[username].capitalize_subject;
          user.capitalize_subject.desc = "capitalize_subject"
          user.capitalize_subject.rate
              = user.capitalize_subject.pass
              / user.commits;

          user.no_period_subject = raw_users[username].no_period_subject;
          user.no_period_subject.desc = "no_period_subject"
          user.no_period_subject.rate
              = user.no_period_subject.pass
              / user.commits;

          user.imperative_subject = raw_users[username].imperative_subject;
          user.imperative_subject.desc = "imperative_subject"
          user.imperative_subject.rate
              = user.imperative_subject.pass
              / user.commits;

          user.body_used = raw_users[username].body_used;
          user.body_used.desc = "body_used"
          user.body_used.rate
              = user.body_used.pass
              / user.commits;

          user.body_limit = raw_users[username].body_limit;
          user.body_limit.desc = "body_limit"
          if (user.body_used.pass > 0) {
            user.body_limit.rate
                = user.body_limit.pass
                / user.body_used.pass;
          } else {
            user.body_limit.rate = 0;
          }

          user.empty_second_line = raw_users[username].empty_second_line;
          user.empty_second_line.desc = "empty_second_line"
          if (user.body_used.pass > 0) {
            user.empty_second_line.rate
                = user.empty_second_line.pass
                / user.body_used.pass;
          } else {
            user.empty_second_line.rate = 0;
          }

          // Nonos
          user.no_short_message = raw_users[username].no_short_message;
          user.no_short_message.desc = "no_short_message"
          user.no_short_message.rate
              = user.no_short_message.pass
              / user.commits;

          user.no_long_message = raw_users[username].no_long_message;
          user.no_long_message.desc = "no_long_message"
          user.no_long_message.rate
              = user.no_long_message.pass
              / user.commits;

          user.no_bulk_change = raw_users[username].no_bulk_change;
          user.no_bulk_change.desc = "no_bulk_change"
          user.no_bulk_change.rate
              = user.no_bulk_change.pass
              / user.commits;

          user.no_vulgarity = raw_users[username].no_vulgarity;
          user.no_vulgarity.desc = "no_vulgarity"
          user.no_vulgarity.rate
              = user.no_vulgarity.pass
              / user.commits;

          user.no_misspelling = raw_users[username].no_misspelling;
          user.no_misspelling.desc = "no_misspelling"
          user.no_misspelling.rate
              = user.no_misspelling.pass
              / user.commits;

          user.no_duplicate = raw_users[username].no_duplicate;
          user.no_duplicate.desc = "no_duplicate"
          user.no_duplicate.rate
              = user.no_duplicate.pass
              / user.commits;

          // Ratings
          user.rules_rating = average([
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

          user.nonos_rating = average([
            user.no_short_message.rate,
            user.no_long_message.rate,
            user.no_bulk_change.rate,
            user.no_vulgarity.rate,
            user.no_misspelling.rate,
            user.no_duplicate.rate
          ],
          [
            1, 1, 1, 1, 1, 1
          ]);


          var stats = [
            user.subject_limit,
            user.capitalize_subject,
            user.no_period_subject,
            user.imperative_subject,
            user.body_used,
            user.body_limit,
            user.empty_second_line,
            user.no_short_message,
            user.no_long_message,
            user.no_bulk_change,
            user.no_vulgarity,
            user.no_misspelling,
            user.no_duplicate
          ]
          user.rating = (user.rules_rating + user.nonos_rating) / 2;
          user.verdict = getVerdict(user.rating);
          var maxStat = getMaxStat(stats);
          user.strength = getStrengthMessage(maxStat);
          var minStat = getMinStat(stats);
          user.weakness = getWeaknessMessage(minStat);

          scope.users.push(user);
        }

        scope.users_safe = [].concat(scope.users);
        //console.dir(scope.users);
        console.log("Done.");
        scope.status = 200;
      }
    })
    .error(function(data, status, headers, config) {
      console.error(data + ", " + status);
      scope.status = status;
      scope.error_data = data;
    });
  }


  bump();

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

function getMinStat(stats) {
  var min = stats[0];
  for (var i = 1; i < stats.length; i++) {
    if (stats[i].rate < min.rate) {
      min = stats[i];
    }
  }
  return min;
}

function getMaxStat(stats) {
  var max = stats[0];
  for (var i = 1; i < stats.length; i++) {
    if (stats[i].rate > max.rate) {
      max = stats[i];
    }
  }
  return max;
}

function getWeaknessMessage(stat) {
  var msg = "";// = stat.desc + " (" + stat.rate + "): ";
  switch (stat.desc) {
    case "subject_limit": msg += "Limit your subjects to 50 characters"; break;
    case "capitalize_subject": msg += "Capitalize your subjects"; break;
    case "no_period_subject": msg += "Do not put a period at the end of your subject"; break;
    case "imperative_subject": msg += "Your subject should be in imperative mood"; break;
    case "body_used": msg += "Use the body"; break;
    case "body_limit": msg += "Limit your body-lines to 70 characters"; break;
    case "empty_second_line": msg += "Separate subject line and body"; break;
    case "no_short_message": msg += "Use more elaborate messages"; break;
    case "no_long_message": msg += "Use less verbouse messages"; break;
    case "no_bulk_change": msg += "Do not change too many files at once"; break;
    case "no_vulgarity": msg += "Use less vulgar language"; break;
    case "no_misspelling": msg += "Pay attention to spelling"; break;
    case "no_duplicate": msg += "Use fewer duplicate messages"; break;
    default: msg += "DEADBEEF";
  }
  return msg;
}

function getStrengthMessage(stat) {
  var msg = "";// = stat.desc + " (" + stat.rate + "): ";
  switch (stat.desc) {
    case "subject_limit": msg += "You limit your subjects properly"; break;
    case "capitalize_subject": msg += "You capitalize your subjects"; break;
    case "no_period_subject": msg += "You put no period in the end of your subjects"; break;
    case "imperative_subject": msg += "Your subjects are in imperative mood"; break;
    case "body_used": msg += "You use the body"; break;
    case "body_limit": msg += "You limit your body properly"; break;
    case "empty_second_line": msg += "You separate subject and body"; break;
    case "no_short_message": msg += "Your messages are not too short"; break;
    case "no_long_message": msg += "Your messages are not too long"; break;
    case "no_bulk_change": msg += "You do no bulk changes"; break;
    case "no_vulgarity": msg += "You use no vulgarity"; break;
    case "no_misspelling": msg += "You spell you messages correctly"; break;
    case "no_duplicate": msg += "You have no duplicate messages"; break;
    default: msg += "DEADBEEF";
  }
  return msg;
}

function getVerdict(rating) {
  if (rating < 0.1) {
    return "F"
  } else if (rating < 0.2) {
    return "F+"
  } else if (rating < 0.3) {
    return "D-"
  } else if (rating < 0.4) {
    return "D"
  } else if (rating < 0.45) {
    return "D+"
  } else if (rating < 0.5) {
    return "C-"
  } else if (rating < 0.55) {
    return "C-"
  } else if (rating < 0.6) {
    return "C"
  } else if (rating < 0.65) {
    return "C+"
  } else if (rating < 0.7) {
    return "B-"
  } else if (rating < 0.75) {
    return "B"
  } else if (rating < 0.8) {
    return "B+"
  } else if (rating < 0.85) {
    return "A-"
  } else if (rating < 0.9) {
    return "A"
  } else {
    return "A+"
  }
}
