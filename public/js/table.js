$(function () {
  function getCount(rule) {
    return rule.pass + rule.fail + rule.undef;
  }

  var headers = [
    'Author',
    'Commits',
    'Subject limit',
    'Subject capitalized',
    'Subject no period',
    'Subject in imperative',
    'Body used',
    'Body limit',
    'Empty second line',
  ];

  var rules = [
    'subject_limit',
    'capitalize_subject',
    'no_period_subject',
    'imperative_subject',
    'body_used',
    'body_limit',
    'empty_second_line',
  ];

  var table = $('<table role="data" class="sortable"></table>');
  var thead = $('<thead></thead>').append('<tr></tr>');
  var tbody = $('<tbody></tbody>');

  headers.forEach(function (header) {
    $('<th></th>').text(header).appendTo(thead.find('tr'));
  });

  for (var email in stats) {
    var author = stats[email];
    var count  = getCount(author[rules[0]]);
    var row    = $('<tr></tr>').appendTo(tbody);

    $('<td></td>').text(email).appendTo(row);
    $('<td></td>').text(count).appendTo(row);

    rules.forEach(function (rule, index) {
      var cell = $('<td></td>');

      if (index < rules.length - 2 || author.body_used.pass > 0) {
        var value = author[rule]['pass'] / count * 100;
        cell.attr('data-value', value).text(value.toFixed(2) + '%');
      } else {
        cell.attr('data-value', -1).text('-');
      }

      cell.appendTo(row);
    });
  }

  $('#stats-table').append(table.append(thead).append(tbody));
});
