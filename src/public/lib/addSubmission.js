function reloadSubmission(data) {
    if (typeof data === 'string') {
        $('#submissions').html();
        return;
    }
    $('#submissions').html();
    var string = '';
    for (var i = 0; i < data.length; i++) {
        string += '<tr><td>' + (i + 1) + '</td><td>' + data[i].submitedOn + '</td><td>' + data[i].points + '</td></tr>';
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
