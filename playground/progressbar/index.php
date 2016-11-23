<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Progress bar on an upload form</title>
    <style>


        progress {
            position: absolute;
            bottom: 0; left: 0; right: 0;
            width: 100%;
            height: 3rem; background: green; color: #fff;
        }

    </style>
</head>
<body>
<form action="upload.php" method="post" enctype="multipart/form-data">
    Select image to upload:
    <input type="file" name="fileToUpload" id="fileToUpload">
    <input type="submit" value="Upload Image" name="submit">
</form>

<script>
// By Jeremy Keith - https://gist.github.com/adactio/f8046bf3d52b5a08c1541a2b2df70bd8
// Licensed under a CC0 1.0 Universal (CC0 1.0) Public Domain Dedication
// http://creativecommons.org/publicdomain/zero/1.0/
(function (win, doc) {
    'use strict';
    if (!win.XMLHttpRequest || !win.FormData || !win.addEventListener || !doc.querySelectorAll) {
        // doesn't cut the mustard.
        return;
    }
    function hijaxForm (formElement) {
        var progressBar;
        var xhr;
        function addProgressBar () {
            progressBar = doc.createElement('progress');
            progressBar.setAttribute('min', '0');
            progressBar.setAttribute('max', '100');
            progressBar.setAttribute('value', '0');
            formElement.appendChild(progressBar);
        }
        function updateProgressBar (ev) {
            if (ev.lengthComputable) {
                progressBar.value = (ev.loaded / ev.total) * 100;
                progressBar.innerHTML = progressBar.value;
            }
        }
        function ajax (elem) {
            addProgressBar();
            var method = elem.getAttribute('method');
            var url = elem.getAttribute('action');
            var data = new FormData(elem);
            xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.onload = function(ev) {
                win.location = url;
            };
            xhr.upload.onprogress = function (ev) {
                updateProgressBar(ev);
            };
            xhr.send(data);
        }
        formElement.addEventListener('submit', function (ev) {
            ajax(this);
            ev.preventDefault();
        }, false);
    }
    var formElements = doc.querySelectorAll('form[method="post"]');
    for (var i = 0; i < formElements.length; i = i + 1) {
        hijaxForm(formElements[i]);
    }
}(this, this.document));
</script>

</body>
</html>
