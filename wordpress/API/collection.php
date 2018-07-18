<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Get photos by collection</title>
    <link rel="stylesheet" href="https://permanenttourist.ch/wp-content/themes/permanenttourist-v10/Resources/Public/Css/module-grid500.css?ver=1.0" />
    <style>
    .mod.grid500 {
        margin-bottom: 1rem;
        background: #f0f0f0;
        max-width: 45rem;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    }
    .grid-header {
        font-size: 1.5rem;
        text-align: center;
    }
    .uncollapse {
        background: rgba(0, 0, 0, .1) !important;
    }
    </style>
</head>
<body>

<div class="mod grid500" data-pt-photo-collection="aare" data-pt-photo-perpage="12"></div>
<div class="mod grid500" data-pt-photo-collection="james bond"></div>

<script>
(function(i,s,o,g,r,a,m,x){i['jQueryLoader']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();x=s.createElement(o),
m=s.getElementsByTagName(o)[0];x.async=1;x.src=g;m.parentNode.insertBefore(x,m);x.onload=a
})(window,document,'script','http://code.jquery.com/jquery-2.2.4.min.js','jQuery', function(){

    /**
     * Calculate flex sizes for a grid layout
     * @param  {array} image_sizes      The sizes of an image: {width, height}
     * @param  {integer} target_height  Target height of each image in the grid
     * @return {array}                  The calculated, named sizes
     */
    var calculateSizes = function(image_sizes, target_height){

        if (!image_sizes) {
            image_sizes = [600,400];
        }

        return {
            'flex_grow': image_sizes[0] * 100 / image_sizes[1],
            'flex_basis': image_sizes[0] * target_height / image_sizes[1],
            'aspect_ratio': image_sizes[1] / image_sizes[0] * 100 + '%'
        };

    };

    $('[data-pt-photo-collection]').each(function(){
        var _container = $(this);
        var thisCollection = $(this).data('pt-photo-collection');
        var perPage = parseInt($(this).data('pt-photo-perpage'));
        if(!perPage){
            perPage = 30;
        }
        $.ajax({
            url: 'https://permanenttourist.ch/wp-json/wp/v2/photo/',
            method: 'GET',
            context: $(this),
            data: {
                per_page: perPage,
                filter: {
                    collection: thisCollection,
                }
            },
            success: function(response){
                _container.before('<h5 class="grid-header">Photos in the collection “' +thisCollection+ '”</h5>');
                $.each(response, function(){
                    var sizes = calculateSizes([this.featured_image.media_details.sizes.medium_small.width, this.featured_image.media_details.sizes.medium_small.height], 150);
                    _container.append('<figure class="grid-item" data-postid="21055" style="flex-grow:' +sizes.flex_grow+ ';flex-basis:' +sizes.flex_basis+ 'px;">'+
                        '<i class="uncollapse" style="padding-bottom:' +sizes.aspect_ratio+ '"></i>'+
                        '<img class="image" src="' +this.featured_image.media_details.sizes.medium_small.source_url+ '" alt="' +this.title.rendered+ '"><!--figcaption class="caption">' +this.title.rendered+ '</figcaption-->'+
                    '</figure>');
                });
            }
        });

    });
});
</script>

</body>
</html>
