$('#problemGroup').hide();
$('#contest').on('change', function (e) {
    var $this = $(this);
    $.ajax({
      url: '/admin/getProblems/' + $this.val(),
      type: 'GET',
      success: function(data){
          $('#problem').empty();
          var o = new Option("Choose problem!", "");
          $(o).html("Choose problem!");
          $("#problem").append(o);
          if(data && data.length > 0) {
              data.forEach(function (val) {
                  var o = new Option(val.title, val._id);
                  $(o).html(val.title);
                  $("#problem").append(o);
              });
          } else {
              var o = new Option("There are no problems in this contest!", "");
              $(o).html("There are no problems in this contest!");
              $("#problem").append(o);
          }
          $('#problemGroup').show();
      },
      fail: function (data) {
          console.log('failed');
      }
    });
});
