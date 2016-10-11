/* BG Srcset 1.0 */

var Bgsrcset;

(function(){
    'use strict';

    Bgsrcset = function(){

        this.called   = false;
        this.callonce = true;
        this.compat();
    };

    Bgsrcset.prototype.init = function(target, callback){
      //retina bool
      this.retina = window.devicePixelRatio > 1;

      //storage for our elements
      this.elements = [];

      //global onload callback for imagery
      this.callback = typeof callback === 'function' ? callback : function(){};

      //window width, for responsive handling
      this.curwidth = this.getWidth();

      //get our input and turn it into an element list of some sort
      var elems = this.gather(target);

      //parse the element input
      for(var i = 0, l = elems.length; i < l; i++){ this.parse(elems[i]); }

      this.set();
      this.resize();
    };

    /* -----------* /
       Fix compatibility issues*
       *only down to IE8
    / *----------- */

    Bgsrcset.prototype.compat = function(){
      var d = document;
      /* check for getElementsByClassName */
      if(typeof d.getElementsByClassName !== 'function'){
        d.getElementsByClassName = function(str){
          return d.querySelectorAll('.' + str);
        };
      }

      /* check for .trim() */
      if (!String.prototype.trim) {
        String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
      }

      /*------------------------* /
        Check for Event Listener
      / *------*/
      if(!d.addEventListener){
        this.addEvent = function(elem, evName, fn){
          elem.attachEvent('on'+evName,function(e) {
            fn(e || window.event);
          });
        };
      }

    };

    /* -----------* /
       Gather elements
    / *----------- */
    Bgsrcset.prototype.gather = function(target){
      var autotypes = ['HTMLCollection', 'NodeList'];
      var e = target;
      var type =  (e.nodeType) ? 'Object' : Object.prototype.toString.call( e ).replace(/^\[object |\]$/g, '');

      var func = 'parse' + type;

      if(autotypes.indexOf(type) > -1){
          return e;
      }

      if( this[func] ){
          return this[func](e);
      }

      return [];
    };

    Bgsrcset.prototype.parseObject = function( target ) {
      return (target.nodeType) ? [target] : [];
    };

    Bgsrcset.prototype.parseArray = function( target ) {
     return target;
    };

    Bgsrcset.prototype.parseString = function( target ) {

      var d = document;
      var e = target.trim();
      var sel = e[0];
      var elems = [];

      switch(true){
      /* class */
      case sel === '.':
        elems = d.getElementsByClassName(e.substring(1));
        break;
      /* id */
      case sel === '#':
        elems.push(d.getElementById(e.substring(1)));
        break;
      /* tag */
      case /^[a-zA-Z]+$/.test(e):
        elems = d.getElementsByTagName(e);
        break;
      /* unknown */
      default:
        elems = [];
      }

      return elems;
    };

    /* -----------* /
       Parse datasrc
    / *----------- */
    Bgsrcset.prototype.parse = function(obj){
      //our data to parase
      var bgss = obj.getAttribute('bg-srcset');
      /* exit if no attribute */
      if(attr === null){ return false; }

      /* create new element object */
      this.elements.push({});

      /* split up sets */
      var set = bgss.split(',');
      var attr = '';
      var curelem = this.elements[this.elements.length - 1];


      curelem.node = obj;
      curelem.srcset = [];

      /* loop through sets to define breakpoints */
      for(var i = 0, l = set.length; i < l; i++){
        curelem.srcset.push({});
        attr = set[i].trim();
        var attrs = attr.split(' ');
        var a;
        var e;
        var t;
        /* since we can't know the order of the values, starting another loop */
        for(var attrc = 0, attrl = attrs.length; attrc < attrl; attrc++){
          a = attrs[attrc];
          e = curelem.srcset[i]; //current attribute
          t = a.length-1;
          switch(true){
          case a.trim() === "":
            //in case of extra white spaces
            continue;
          case a[t] !== 'w' && a[a.length-1] !== 'x':
            e.src = a;
          break;
          case a[t] === 'w':
            e.width = parseInt( a.slice( 0, -1 ) );
          break;
          case a[t] === 'x':
            e.retina = ( parseInt( a.slice( 0, -1 ) ) > 1);
          break;
          }
          if(! e.width ){ e.width = Number.POSITIVE_INFINITY; } //set to the top
          if(! e.retina ){ e.retina = false; }
        }
      }
    };

    /* -----------* /
       Set image
    / *----------- */
    Bgsrcset.prototype.set = function(){
      for(var i = 0, l = this.elements.length; i < l; i++){
        this.setSingle(i);
      }
    };

    Bgsrcset.prototype.setSingle = function(id){
      var width = 0,
        elem = this.elements[id],
        comparray = [],
        best = 0,
        _this = this;

      width = this.getWidth(); //elem.node.offsetWidth;

      elem.srcset = elem.srcset.sort(dynamicSort("width"));

      for(var i = 0, l = elem.srcset.length; i < l; i++){
        if(elem.srcset[i].width < width){
        continue;
        }
         comparray.push( elem.srcset[i] );
      }
      if(comparray.length === 0){
        comparray.push(elem.srcset[elem.srcset.length -1]);
      }

      best = comparray[0];

      if(comparray.length > 1 && comparray[0].width === comparray[1].width){
        best = (comparray[0].retina !== this.retina) ? comparray[1] : comparray[0];
      }

      if( best.src !== undefined && best.src !== 'null'){
         var img = new Image();
          var done = false;

        img.onload = img.onreadystatechange = function() {
            if ( !done && (!this.readyState ||
                this.readyState === "loaded" || this.readyState === "complete") ) {
                done = true;

                elem.node.style.backgroundImage = "url('" + best.src + "')";

                /* only fire the callback on initial load, not resize events */
                if (!_this.called) {

                    _this.callback(elem);
                    _this.called = _this.callonce;

                }

            }

        };

        img.src = best.src;
      }else{
        elem.node.style.backgroundImage = "";
      }




    };

    /* -----------* /
       Handle Resize
    / *----------- */
    Bgsrcset.prototype.resize = function(){
      var _this = this,
        resizeTimer = setTimeout(function(){}, 0);

       this.addEvent(window, 'resize',function() {
         clearTimeout(resizeTimer);
         resizeTimer = setTimeout(function(){
           var w =  _this.getWidth();
           if ( w !== _this.curwidth ){
             _this.curwidth = w;
             _this.set();
           }
         }, 250);
       });
    };

    Bgsrcset.prototype.addEvent = function(elem, evName, fn){
      elem.addEventListener(evName,fn,false);
    };

    Bgsrcset.prototype.getWidth = function(){
        var w, d, e, g;
        w = window;
        d = document;
        e = d.documentElement;
        g = d.getElementsByTagName('body')[0];

        return w.innerWidth || e.clientWidth || g.clientWidth;
    };

    function dynamicSort(property) {
      var sortOrder = 1;
      if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
      }
      return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
      };
    }

    window.Bgsrcset = Bgsrcset;
})();
/*
usage
var bgss = new Bgsrcset();
bgss.init('.bgimg' );
*/
var bgss = new Bgsrcset();

bgss.callonce = false;

bgss.init('.bg-srcset', function(a){
  a.node.className += ' loaded';
} );