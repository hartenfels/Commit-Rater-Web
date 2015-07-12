var app = angular.module('app', ['smart-table']);

app.filter('percentage', ['$filter', function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals) + '%';
  };
}]);

app.controller('sortCtrl', ['$scope', function (scope) {
  scope.users = [
    {
      "name"     : "turbopope",
      "email"    : "PapstDonB@Googlemail.com",
      "commits"  : 40,
      "rating"   : 0.85,
      "analysis" : {
        "empty_second_line" : {
          "passed"  : 29,
          "fail"  : 2,
          "undef" : 10
        },
        "subject_limit"     : {
          "passed" : 29,
          "failed" : 7,
          "undef"  : 0
        },
        "capitalize_subject"     : {
          "passed" : 35,
          "failed" : 7,
          "undef"  : 0
        },
        "no_period_subject"     : {
          "passed" : 35,
          "failed" : 7,
          "undef"  : 0
        },
        "imperative_subject"     : {
          "passed" : 35,
          "failed" : 7,
          "undef"  : 0
        },
        "body_limit"     : {
          "passed" : 35,
          "failed" : 7,
          "undef"  : 0
        },
        "body_used"     : {
          "passed" : 35,
          "failed" : 7,
          "undef"  : 0
        }
      }
    },
    {
      "name"     : "hartenfels",
      "email"    : "hertenfels@Googlemail.com",
      "commits"  : 42,
      "rating"   : 0.85,
      "analysis" : {
        "empty_second_line" : {
          "passed"  : 30,
          "fail"  : 2,
          "undef" : 10
        },
        "subject_limit"     : {
          "passed" : 35,
          "failed" : 7,
          "undef"  : 0
        },
        "capitalize_subject"     : {
          "passed" : 35,
          "failed" : 7,
          "undef"  : 0
        },
        "no_period_subject"     : {
          "passed" : 35,
          "failed" : 7,
          "undef"  : 0
        },
        "imperative_subject"     : {
          "passed" : 35,
          "failed" : 7,
          "undef"  : 0
        },
        "body_limit"     : {
          "passed" : 35,
          "failed" : 7,
          "undef"  : 0
        },
        "body_used"     : {
          "passed" : 35,
          "failed" : 7,
          "undef"  : 0
        }
      }
    }
  ];

  for (var i = 0; i < scope.users.length; i++) {
    scope.users[i].analysis.empty_second_line.rate
        = scope.users[i].analysis.empty_second_line.passed
        / scope.users[i].analysis.body_used.passed;
    scope.users[i].analysis.subject_limit.rate
        = scope.users[i].analysis.subject_limit.passed
        / scope.users[i].commits;
    scope.users[i].analysis.capitalize_subject.rate
        = scope.users[i].analysis.capitalize_subject.passed
        / scope.users[i].commits;
    scope.users[i].analysis.no_period_subject.rate
        = scope.users[i].analysis.no_period_subject.passed
        / scope.users[i].commits;
    scope.users[i].analysis.imperative_subject.rate
        = scope.users[i].analysis.imperative_subject.passed
        / scope.users[i].commits;
    scope.users[i].analysis.body_limit.rate
        = scope.users[i].analysis.body_limit.passed
        / scope.users[i].analysis.body_used.passed;
    scope.users[i].analysis.body_used.rate
        = scope.users[i].analysis.body_used.passed
        / scope.users[i].commits;
  }
}]);
