/**
 * Re-calcuate width of an element with overflow: auto or overflow: scroll
 * so that it is wider than its parent. Then ensure that the parent has overflow: hidden
 * and the scrollbars will be outside the visible container area.
 *
 * e.g.
 * .parent {width: 100vw; height: 100vh; position: relative; overflow: hidden;}
 * .parent .main {position: absolute; top: 0; left: 0; bottom: 0; width: 60%; overflow-y: auto;}
 * .parent .side {position: absolute; top: 0; left: 60%; bottom: 0; width: 40%; overflow-y: auto;}
 *
 * Resultant widths: calc(60% + 15px) and calc(40% + 15px)
 *
 * Since 12/2016.
 * https://github.com/markhowellsmead/helpers/
 */

(function(i,s,o,g,r,a,m,x){i['jQueryLoader']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();x=s.createElement(o),
m=s.getElementsByTagName(o)[0];x.async=1;x.src=g;m.parentNode.insertBefore(x,m);x.onload=a
})(window,document,'script','https://code.jquery.com/jquery-2.2.4.min.js','jQuery', function(){

    $.fn.hideScrollbarViaWidth = function(){
        var getScrollbarWidth = function() {
            var div, width = getScrollbarWidth.width;
            if (width === undefined) {
                div = document.createElement('div');
                div.innerHTML = '<div style="width:50px;height:50px;position:absolute;left:-50px;top:-50px;overflow:auto;"><div style="width:1px;height:100px;"></div></div>';
                div = div.firstChild;
                document.body.appendChild(div);
                width = getScrollbarWidth.width = div.offsetWidth - div.clientWidth;
                document.body.removeChild(div);
            }
            return width;
        };

        var width = ( 100 * parseFloat($(this).css('width')) / parseFloat($(this).parent().css('width')) ) + '%';
        $(this).width('calc(' +width+ ' + '+getScrollbarWidth() + 'px)');
        return this;
    };

    $('.main').hideScrollbarViaWidth();
    $('.side').hideScrollbarViaWidth();

});
