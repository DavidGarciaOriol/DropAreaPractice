document.addEventListener('DOMContentLoaded', (event)=>{


    // DOM Elements

    let dropArea = document.getElementById('drop-area');
    let gallery = document.getElementById('gallery');

    // Events Functions

    function preventDefaults (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(e) {
        dropArea.classList.add('highlight');
    }
      
    function unhighlight(e) {
        dropArea.classList.remove('highlight');
    }

    function uploadFile(file) {
        var url = '<URL>';
        var xhr = new XMLHttpRequest();
        var formData = new FormData();
        xhr.open('POST', url, true);
      
        xhr.addEventListener('readystatechange', function(e) {
          if (xhr.readyState == 4 && xhr.status == 200) {
            // TODO
          }
          else if (xhr.readyState == 4 && xhr.status != 200) {
            // TODO
          }
        })
      
        formData.append('file', file)
        xhr.send(formData)
      }

    function previewFile(file) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function() {
          let img = document.createElement('img');
          img.src = reader.result;
          gallery.appendChild(img);
        }
    }

    function handleFiles(files) {
      files = [...files];
      files.forEach(uploadFile);
      files.forEach(previewFile);
    }

    function handleDrop(e) {
        let dt = e.dataTransfer;
        let files = dt.files;

        handleFiles(files);
    }

    // Events Listeners

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });

    dropArea.addEventListener('drop', handleDrop, false);

})
