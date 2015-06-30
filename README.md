# Commit Rater Web
A website that shows the results of our [Commit Rater](https://github.com/hartenfels/Commit-Rater). Backend uses Mojolicious, frontend uses AngularJS.

## Routes
We will call all the analysis data and rating and stuff of a developer just *stats* in the following.

### `GET /res/repo/:user/:repo`

Poll the status of `:user`'s Github repo `:repo`. Returns a status of `200` and the stats if the repo has been rated, `202` if it's still in the process of being rated and forwards whatever errors were encountered from Github.

## Views

``` Bash
#GET /?:size&:page # View a page of the global "leaderboard"
GET /repo/:user/:repo/ # View repo-leaderboard
#GET /repo/:repo/devs/:dev/ # View detailed stats for :dev in :repo
```

Leaderboards only compare analysis fields that are factored into the rating and the rating itself. Clicking on a dev in a leaderboard shows the page with a detailed analysis, including unrated analysis fields, comparisons with the global average for some fields and suggestions for improvement.

## Data
A developers stats might look like this:

```JavaScript
{
  "name"     : "turbopope",
  "email"    : "PapstDonB@Googlemail.com",
  "commits"  : 42,
  "rating"   : 0.85,
  "analysis" : {
    "empty_second_line" : {
      "pass"  : 30,
      "fail"  : 2,
      "undef" : 10
    },
    "subject_limit"     : {
      "passed" : 35,
      "failed" : 7,
      "undef"  : 0
    },
    // ...
  }
}

```

Analysis fields factored into the rating are:

* `empty_second_line`
* `subject_limit`
* `capitalize_subject`
* `no_period_subject`
* `imperative_subject`
* `body_limit`
* `body_used`
