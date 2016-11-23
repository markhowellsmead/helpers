(function($, undefined){

    var api_root = 'http://frappant.mhm/rest/';

    $.ajax({
        type: "GET",
        url: api_root + 'VirtualObject-Pages/',
        success: function(response){
            var $list = $('<ul class="list"></ul>');
            var parent = 0;

            var pages = [];

            $.each(response, function(){
                var pid = this.parentID.toString();
                if(!pages[pid]){
                    pages[pid] = [];
                    pages[pid].title = this.title;
                    pages[pid].description = this.description;
                }
                pages[pid].push(this);
            });

            console.log(pages);
        },
        error: function(jqXHR, textStatus, errorThrown){
            $('body').append('Error '+jqXHR.status);
        }
    });

})(jQuery);
