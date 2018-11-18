(function() {
  var width = 320;    
  var height = 0;     
  var streaming = false;
  var video = null;
  var canvas = null;
  var photo = null;
  var startbutton = null;

  function startup() {
    video = document.getElementById('video');
    canvas = document.getElementById('canvas');
    photo = document.getElementById('photo');
    startbutton = document.getElementById('startbutton');

    navigator.getMedia = ( navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia);

    navigator.getMedia(
      {
        video: true,
        audio: false
      },
      function(stream) {
        if (navigator.mozGetUserMedia) {
          video.mozSrcObject = stream;
        } else {
          var vendorURL = window.URL || window.webkitURL;
          video.src = vendorURL.createObjectURL(stream);
        }
        video.play();
      },
      function(err) {
        console.log("An error occured! " + err);
      }
    );

    video.addEventListener('canplay', function(ev){
      if (!streaming) {
        height = video.videoHeight / (video.videoWidth/width);
        if (isNaN(height)) {
          height = width / (4/3);
        }
      
        video.setAttribute('width', width);
        video.setAttribute('height', height);
        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        streaming = true;
      }
    }, false);

    startbutton.addEventListener('click', function(ev){
      takepicture();
      ev.preventDefault();
    }, false);
    
    clearphoto();
  }
  function clearphoto() {
    var context = canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.width, canvas.height);

    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }
  function takepicture() {
    var context = canvas.getContext('2d');
    if (width && height) {
      canvas.width = width;
      canvas.height = height;
      context.drawImage(video, 0, 0, width, height);
    
      var data = canvas.toDataURL('image/jpeg', 0.4);
      console.log(data);
      photo.setAttribute('src', data);
      console.log(photo.display);

      var formData = new FormData();
      console.log();
      formData.append("image", data, 'image.png');
      console.log(formData);
    } else {
      clearphoto();
    }
  }
  window.addEventListener('load', startup, false);
})();

$( '#pip' )
  .submit( function( e ) {
    $.ajax( {
      url: 'http://host.com/action/',
      type: 'POST',
      data: new FormData( this ),
      processData: false,
      contentType: false
    } );
    e.preventDefault();
  } );

  var client = new XMLHttpRequest();
  
   function insertim_img()
   {
      var file = document.getElementById("uploadfile");
     
      /* Create a FormData instance */
      var formData = new FormData();
      /* Add the file */ 
      formData.append("upload", file.files[0]);
      console.log(file.files[0]);
      console.log(formData);

      /*ajax*/
      $.ajax( {
        url: 'http://host.com/action/',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false
      } );
      /*simple*/
      client.open("post", "/adds/insert_img.php", true);
      client.setRequestHeader("Content-Type", "multipart/form-data");
      client.send(formData);  /* Send to server */ 
      
   }
     
   /* Check the response status */  
   client.onreadystatechange = function() 
   {
      if (client.readyState == 4 && client.status == 200) 
      {
         alert(client.statusText);
      }
   }