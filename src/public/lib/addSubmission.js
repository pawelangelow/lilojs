function reloadSubmission(data) {
    if (typeof data === 'string') {
        $('#submissions').html();
        return;
    }
    $('#submissions').html();
    var string = '';
    for (var i = 0; i < data.length; i++) {
        string += '<tr><td>' + (i + 1) + '</td><td>' + moment(data[i].submitedOn).startOf('minute').fromNow() + '</td><td>' + Math.round(data[i].points * 100) / 100 + '</td></tr>';
    }
    $('#submissions').html(string);
}

$.ajax({
      url: '/submissions/get/' + $('#problemId').val(),
      type: 'GET',
      success: function(data){
          reloadSubmission(data);
      },
      fail: function (data) {
          console.log('failed');
      }
});
