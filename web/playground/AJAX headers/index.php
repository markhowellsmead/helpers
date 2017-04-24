<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Get the response headers of a remote URL via AJAX</title>
    <style>

    #figure {
        margin: 1rem 0;
        width: 800px;
        height: 0;
        padding-bottom: 25%;
        background: #eee center/contain no-repeat;
    }

    </style>
</head>
<body>

<p>These are the headers received from a AJAX request to http://www.gurten-kulm.ch/webcam/hscam002.jpg.</p>
<pre id="console" data-url="http://www.gurten-kulm.ch/webcam/hscam002.jpg"></pre>
<figure id="figure"></figure>
<script>
    (function(){

        var was_date;

        function loadScript(e,t){var a=document.createElement("script");a.type="text/javascript",a.readyState?a.onreadystatechange=function(){"loaded"!==a.readyState&&"complete"!==a.readyState||(a.onreadystatechange=null,t())}:a.onload=function(){t()},a.src=e,document.getElementsByTagName("head")[0].appendChild(a)};

        function poll(url){
            $.ajax({
                url: 'curl.php?url=' +url,
                method: 'jsonp',
                success: function(data, textStatus, response){
                    $.each(response.responseJSON, function(){
                        var details = this.split(': ');
                        if(details[0] === 'Last-Modified'){
                            var is_date = new Date(details[1]).getTime();
                            if(is_date !== was_date){
                                var img = new Image();
                                img.onload = function(){
                                    $('#figure').css('background-image', 'url("' +this.src+ '")');
                                    console.log('New image at '+new Date(details[1]));
                                    was_date = is_date;
                                };
                                img.src = url + '?' + (new Date()).getTime();
                            }
                        }
                    });
                }
            });
        }

        loadScript("https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js", function(){

            var url = $('#console').data('url');
            $.ajaxSetup({ cache: false });

            was_date = 0;

            poll(url);

            setInterval(function(){
                poll(url);
            }, 10000);


        });
    })();
</script>

</body>
</html>
