# Commit Rater Web
A website that shows the results of our [Commit Rater](https://github.com/hartenfels/Commit-Rater). Backend uses Mojolicious, frontend uses Embedded Perl and AngularJS.

## Routes

```
GET /res?:size&:page # Get analysis and synthesis data on a page of the global ranking
GET /res/repos/:repo/ # Get analysis and synthesis data for all users in :repo
GET /res/repos/:repo/users/:user/ # Get analysis and synthesis data for :user in :repo
```

## Views

```
GET /res?:size&:page # View analysis and synthesis data on a page of the global ranking
GET /res/repos/:repo/ # View analysis and synthesis data for all users in :repo
GET /res/repos/:repo/users/:user/ # View analysis and synthesis data for :user in :repo
```

## Data
A developers data might look like this:

```JSON
{
  name: "turbopope",
  email: "PapstDonB@Googlemail.com",
  commits: 42,
  rating: 0.85,
  analysis: {
    bodySeparation: {
      passed: 40,
      failed: 2
    },
    limit50Chars: {
      passed: 35,
      failed: 7
    },
    ...
  }
}

```
