$('#upload-btn2').on('click', function () {
    $('#upload-input2').click();
    $('#progress-bar2').text('0%');
    $('#progress-bar2').width('0%');
});

$('#upload-input2').on('change', function () {
  var files = $(this).get(0).files;

    if (files.length > 0){
    // create a FormData object which will be sent as the data payload in the
    // AJAX request
    var formData = new FormData();

    // loop through all the selected files and add them to the formData object
    for (var i = 0; i < files.length; i++) {
      var file = files[i];

      // add the files to formData object for the data payload
      formData.append('uploads2[]', file, file.name);
    }

    $.ajax({
      url: '/upload',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data){
          $('#fileName2').val(data);
      },
      fail: function (data) {
          console.log(data, 'failed');
      },
      xhr: function() {
        // create an XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // listen to the 'progress' event
        xhr.upload.addEventListener('progress', function(evt) {

          if (evt.lengthComputable) {
            // calculate the percentage of upload completed
            var percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);

            // update the Bootstrap progress bar with the new percentage
            $('#progress-bar2').text(percentComplete + '%');
            $('#progress-bar2').width(percentComplete + '%');

            // once the upload reaches 100%, set the progress bar text to done
            if (percentComplete === 100) {
              $('#progress-bar2').html('Done');
            }

          }

        }, false);

        return xhr;
      }
    });

  }
});
