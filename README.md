# Commit Rater Web
A website that shows the results of our [Commit Rater](https://github.com/hartenfels/Commit-Rater). Backend uses Mojolicious, frontend uses Embedded Perl and AngularJS.

## Routes
We will call all the analysis data and rating and stuff of a developer just *data* in the following.

```
GET /res?:size&:page # Get data on a page of the global "leaderboard"
GET /res/repos/:user/:repo/ # Get data for all devs from Github repo :user/:repo
GET /res/repos/:repo/devs/:dev/ # Get data for :dev in :repo
GET /res/averages # Global averages for all analysis fields (?)
```

## Views

```
GET /?:size&:page # View a page of the global "leaderboard"
GET /repos/:user/:repo/ # View repo-leaderboard
GET /repos/:repo/devs/:dev/ # View detailed data for :dev in :repo
```

Leaderboards only compare analysis fields that are factored into the rating and the rating itself. Clicking on a dev in a leaderboard shows the page with a detailed analysis, including unrated analysis fields, comparisons with the global average for some fields and suggestions for improvement.

## Data
A developers data might look like this:

```JSON
{
  name: "turbopope",
  email: "PapstDonB@Googlemail.com",
  commits: 42,
  rating: 0.85,
  analysis: {
    empty_second_line: {
      pass: 30,
      fail: 2,
      undef: 10
    },
    subject_limit: {
      passed: 35,
      failed: 7,
      undef: 0
    },
    ...
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
