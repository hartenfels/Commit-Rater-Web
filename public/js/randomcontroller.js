// angular.module('repoViewer', [])
//   .controller('repoViewController', function() {
//     var repoViewController = this;
//
//     // TODO: Fetch real data via http
//     repoViewController.users = [
//       {
//         "name"     : "turbopope",
//         "email"    : "PapstDonB@Googlemail.com",
//         "commits"  : 42,
//         "rating"   : 0.85,
//         "analysis" : {
//           "empty_second_line" : {
//             "passed"  : 30,
//             "fail"  : 2,
//             "undef" : 10
//           },
//           "subject_limit"     : {
//             "passed" : 35,
//             "failed" : 7,
//             "undef"  : 0
//           },
//           "capitalize_subject"     : {
//             "passed" : 35,
//             "failed" : 7,
//             "undef"  : 0
//           },
//           "no_period_subject"     : {
//             "passed" : 35,
//             "failed" : 7,
//             "undef"  : 0
//           },
//           "imperative_subject"     : {
//             "passed" : 35,
//             "failed" : 7,
//             "undef"  : 0
//           },
//           "body_limit"     : {
//             "passed" : 35,
//             "failed" : 7,
//             "undef"  : 0
//           },
//           "body_used"     : {
//             "passed" : 35,
//             "failed" : 7,
//             "undef"  : 0
//           }
//         }
//       },
//       {
//         "name"     : "hartenfels",
//         "email"    : "hertenfels@Googlemail.com",
//         "commits"  : 42,
//         "rating"   : 0.85,
//         "analysis" : {
//           "empty_second_line" : {
//             "passed"  : 30,
//             "fail"  : 2,
//             "undef" : 10
//           },
//           "subject_limit"     : {
//             "passed" : 35,
//             "failed" : 7,
//             "undef"  : 0
//           },
//           "capitalize_subject"     : {
//             "passed" : 35,
//             "failed" : 7,
//             "undef"  : 0
//           },
//           "no_period_subject"     : {
//             "passed" : 35,
//             "failed" : 7,
//             "undef"  : 0
//           },
//           "imperative_subject"     : {
//             "passed" : 35,
//             "failed" : 7,
//             "undef"  : 0
//           },
//           "body_limit"     : {
//             "passed" : 35,
//             "failed" : 7,
//             "undef"  : 0
//           },
//           "body_used"     : {
//             "passed" : 35,
//             "failed" : 7,
//             "undef"  : 0
//           }
//         }
//       }
//     ];
//   });


var app = angular.module('app', ['smart-table']);

app.controller('sortCtrl', ['$scope', '$filter', function (scope, filter) {
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
}]);
