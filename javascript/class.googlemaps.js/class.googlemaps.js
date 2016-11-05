/*
	general map generation class
	18.9.2013 | m@mhm.li
	
	This code is provided as-is under the GPL GNU General Public Licence v3
	and may be freely used, adapted and built upon. No guarantee is provided or implied. Test your code!
	http://www.gnu.org/licenses/gpl.html

	Simplify generation of Google Maps on a web page

	The existing default usage via Google's own implementation is great, but this version adds an improved
	overlay function, the option to add MarkerLabel functionality by setting an option to true, and much
	easier addition of custom map styles.
	
	• Labels are displayed with the markers. Label content is displayed directly in the map.
	• Markercontent is displayed in the overlay when a marker is clicked.
	
	This file is quite heavy and heavily commented. Use class.googlemaps.min.js instead.

	See class.googlemaps.html for a demo of how to use this script with a couple of simple options.
	
	Also see http://google-maps-utility-library-v3.googlecode.com/svn/tags/markerwithlabel/1.1.9/src/markerwithlabel_packed.js

*/

// http://google-maps-utility-library-v3.googlecode.com/svn/tags/markerwithlabel/1.1.9/src/markerwithlabel_packed.js
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('7 1G(b,a){7 1u(){};1u.v=a.v;b.2B=a.v;b.v=1b 1u();b.v.3h=b}7 u(c,b,a){2.3=c;2.1L=c.2y;2.6=K.1A("2k");2.6.4.S="Z: 1p; 15: 1P;";2.q=K.1A("2k");2.q.4.S=2.6.4.S;2.q.1M("2A","1d A;");2.q.1M("2w","1d A;");2.U=u.P(b)}1G(u,8.5.3g);u.P=7(b){t a;9(C u.P.1j==="B"){a=K.1A("30");a.4.S="Z: 1p; z-2Y: 2W; M: 13;";a.4.1l="-2P";a.4.1x="-2M";a.2I=b;u.P.1j=a}1d u.P.1j};u.v.2D=7(){t g=2;t m=A;t c=A;t f;t j,1e;t p;t d;t h;t o;t n=20;t i="3p("+2.1L+")";t k=7(e){9(e.2q){e.2q()}e.3l=G;9(e.2n){e.2n()}};t l=7(){g.3.2m(3c)};2.1E().1J.X(2.6);2.1E().36.X(2.q);9(C u.P.2e==="B"){2.1E().1J.X(2.U);u.P.2e=G}2.1t=[8.5.r.O(2.q,"2c",7(e){9(g.3.R()||g.3.W()){2.4.19="25";8.5.r.D(g.3,"2c",e)}}),8.5.r.O(2.q,"21",7(e){9((g.3.R()||g.3.W())&&!c){2.4.19=g.3.2V();8.5.r.D(g.3,"21",e)}}),8.5.r.O(2.q,"1X",7(e){c=A;9(g.3.R()){m=G;2.4.19=i}9(g.3.R()||g.3.W()){8.5.r.D(g.3,"1X",e);k(e)}}),8.5.r.O(K,"1s",7(a){t b;9(m){m=A;g.q.4.19="25";8.5.r.D(g.3,"1s",a)}9(c){9(d){b=g.Y().1v(g.3.Q());b.y+=n;g.3.J(g.Y().1S(b));2O{g.3.2m(8.5.2N.2L);2J(l,2H)}2E(e){}}g.U.4.M="13";g.3.11(f);p=G;c=A;a.L=g.3.Q();8.5.r.D(g.3,"1N",a)}}),8.5.r.w(g.3.1g(),"2C",7(a){t b;9(m){9(c){a.L=1b 8.5.2z(a.L.1f()-j,a.L.1i()-1e);b=g.Y().1v(a.L);9(d){g.U.4.14=b.x+"H";g.U.4.T=b.y+"H";g.U.4.M="";b.y-=n}g.3.J(g.Y().1S(b));9(d){g.q.4.T=(b.y+n)+"H"}8.5.r.D(g.3,"1K",a)}V{j=a.L.1f()-g.3.Q().1f();1e=a.L.1i()-g.3.Q().1i();f=g.3.1c();h=g.3.Q();o=g.3.1g().2x();d=g.3.F("16");c=G;g.3.11(1I);a.L=g.3.Q();8.5.r.D(g.3,"1H",a)}}}),8.5.r.O(K,"2v",7(e){9(c){9(e.3r===27){d=A;g.3.J(h);g.3.1g().3q(o);8.5.r.D(K,"1s",e)}}}),8.5.r.O(2.q,"2u",7(e){9(g.3.R()||g.3.W()){9(p){p=A}V{8.5.r.D(g.3,"2u",e);k(e)}}}),8.5.r.O(2.q,"2s",7(e){9(g.3.R()||g.3.W()){8.5.r.D(g.3,"2s",e);k(e)}}),8.5.r.w(2.3,"1H",7(a){9(!c){d=2.F("16")}}),8.5.r.w(2.3,"1K",7(a){9(!c){9(d){g.J(n);g.6.4.N=1I+(2.F("17")?-1:+1)}}}),8.5.r.w(2.3,"1N",7(a){9(!c){9(d){g.J(0)}}}),8.5.r.w(2.3,"3o",7(){g.J()}),8.5.r.w(2.3,"3n",7(){g.11()}),8.5.r.w(2.3,"3m",7(){g.18()}),8.5.r.w(2.3,"3j",7(){g.18()}),8.5.r.w(2.3,"3i",7(){g.1C()}),8.5.r.w(2.3,"3f",7(){g.1y()}),8.5.r.w(2.3,"3e",7(){g.1z()}),8.5.r.w(2.3,"3d",7(){g.1a()}),8.5.r.w(2.3,"3b",7(){g.1a()})]};u.v.3a=7(){t i;2.6.2j.2i(2.6);2.q.2j.2i(2.q);2h(i=0;i<2.1t.39;i++){8.5.r.38(2.1t[i])}};u.v.37=7(){2.1y();2.1C();2.1a()};u.v.1y=7(){t a=2.3.F("1w");9(C a.35==="B"){2.6.12=a;2.q.12=2.6.12}V{2.6.12="";2.6.X(a);a=a.34(G);2.q.X(a)}};u.v.1C=7(){2.q.33=2.3.32()||""};u.v.1a=7(){t i,E;2.6.1r=2.3.F("1q");2.q.1r=2.6.1r;2.6.4.S="";2.q.4.S="";E=2.3.F("E");2h(i 31 E){9(E.2Z(i)){2.6.4[i]=E[i];2.q.4[i]=E[i]}}2.2b()};u.v.2b=7(){2.6.4.Z="1p";2.6.4.15="1P";9(C 2.6.4.I!=="B"&&2.6.4.I!==""){2.6.4.2a="\\"29:28.26.2f(I="+(2.6.4.I*24)+")\\"";2.6.4.23="22(I="+(2.6.4.I*24)+")"}2.q.4.Z=2.6.4.Z;2.q.4.15=2.6.4.15;2.q.4.I=0.2X;2.q.4.2a="\\"29:28.26.2f(I=1)\\"";2.q.4.23="22(I=1)";2.1z();2.J();2.18()};u.v.1z=7(){t a=2.3.F("1o");2.6.4.1l=-a.x+"H";2.6.4.1x=-a.y+"H";2.q.4.1l=-a.x+"H";2.q.4.1x=-a.y+"H"};u.v.J=7(a){t b=2.Y().1v(2.3.Q());9(C a==="B"){a=0}2.6.4.14=1Z.1Y(b.x)+"H";2.6.4.T=1Z.1Y(b.y-a)+"H";2.q.4.14=2.6.4.14;2.q.4.T=2.6.4.T;2.11()};u.v.11=7(){t a=(2.3.F("17")?-1:+1);9(C 2.3.1c()==="B"){2.6.4.N=2U(2.6.4.T,10)+a;2.q.4.N=2.6.4.N}V{2.6.4.N=2.3.1c()+a;2.q.4.N=2.6.4.N}};u.v.18=7(){9(2.3.F("1n")){2.6.4.M=2.3.2T()?"2S":"13"}V{2.6.4.M="13"}2.q.4.M=2.6.4.M};7 1m(a){a=a||{};a.1w=a.1w||"";a.1o=a.1o||1b 8.5.2R(0,0);a.1q=a.1q||"2Q";a.E=a.E||{};a.17=a.17||A;9(C a.1n==="B"){a.1n=G}9(C a.16==="B"){a.16=G}9(C a.2d==="B"){a.2d=G}9(C a.1W==="B"){a.1W=A}9(C a.1B==="B"){a.1B=A}a.1k=a.1k||"1V"+(K.1U.1T==="2g:"?"s":"")+"://5.1R.1Q/2t/2l/2o/2K.3k";a.1F=a.1F||"1V"+(K.1U.1T==="2g:"?"s":"")+"://5.1R.1Q/2t/2l/2o/2G.2F";a.1B=A;2.2p=1b u(2,a.1k,a.1F);8.5.1D.1O(2,2r)}1G(1m,8.5.1D);1m.v.1h=7(a){8.5.1D.v.1h.1O(2,2r);2.2p.1h(a)};',62,214,'||this|marker_|style|maps|labelDiv_|function|google|if|||||||||||||||||eventDiv_|event||var|MarkerLabel_|prototype|addListener||||false|undefined|typeof|trigger|labelStyle|get|true|px|opacity|setPosition|document|latLng|display|zIndex|addDomListener|getSharedCross|getPosition|getDraggable|cssText|top|crossDiv_|else|getClickable|appendChild|getProjection|position||setZIndex|innerHTML|none|left|overflow|raiseOnDrag|labelInBackground|setVisible|cursor|setStyles|new|getZIndex|return|cLngOffset|lat|getMap|setMap|lng|crossDiv|crossImage|marginLeft|MarkerWithLabel|labelVisible|labelAnchor|absolute|labelClass|className|mouseup|listeners_|tempCtor|fromLatLngToDivPixel|labelContent|marginTop|setContent|setAnchor|createElement|optimized|setTitle|Marker|getPanes|handCursor|inherits|dragstart|1000000|overlayImage|drag|handCursorURL_|setAttribute|dragend|apply|hidden|com|gstatic|fromDivPixelToLatLng|protocol|location|http|draggable|mousedown|round|Math||mouseout|alpha|filter|100|pointer|Microsoft||DXImageTransform|progid|MsFilter|setMandatoryStyles|mouseover|clickable|processed|Alpha|https|for|removeChild|parentNode|div|en_us|setAnimation|stopPropagation|mapfiles|label|preventDefault|arguments|dblclick|intl|click|keydown|ondragstart|getCenter|handCursorURL|LatLng|onselectstart|superClass_|mousemove|onAdd|catch|cur|closedhand_8_8|1406|src|setTimeout|drag_cross_67_16|BOUNCE|9px|Animation|try|8px|markerLabels|Point|block|getVisible|parseInt|getCursor|1000002|01|index|hasOwnProperty|img|in|getTitle|title|cloneNode|nodeType|overlayMouseTarget|draw|removeListener|length|onRemove|labelstyle_changed|null|labelclass_changed|labelanchor_changed|labelcontent_changed|OverlayView|constructor|title_changed|labelvisible_changed|png|cancelBubble|visible_changed|zindex_changed|position_changed|url|setCenter|keyCode'.split('|'),0,{}));

var MarkerWithLabel,marker,bounds;

(function() {

	googlemaps = {
		map: null,
		infowindow: null,
		infowindowContent: null,
		locations: [],
		pins: [],
		
		////////////////////////////////////////////////////////////////////////////////
		// Options. Can be reset externally before drawing the map.
		text: {
			reset: 'Reset',
			close: 'Close'
		},
		asset_path:'',
		pin_default: function(){
			return null;
		},
		useStyledMarkers: false,
		options: {
			mapTypeID: null,			// e,g. google.maps.MapTypeId.HYBRID
			lat_default:46.817918,		// default latitude
			lon_default:8.227386,		// default longitude
			zoomlevel_default:7,		// default zoom level
			zoomlevel_near:10,			// if map zooms when clicking on a marker, the zoom level to go to
			focus_centre:true,			// when clicking on a marker, should the map centre itself on the clicked marker
			showLabels: false,			// should labels be added to the markers?
			fitToBounds: false,			// should the map automatically set itself to include all markers in the default view?
			hasInfoWindow: true,		// does an infowindow appear when clicking on a marker
			focus_zoom:true				// when clicking on a marker, should the map zoom in to the clicked marker
		},
		controls: {
			// these options are here in order to comply with Google logic for separating controls and other options
			resetbutton:true,			// add a reset button to the map?
			visualRefresh:true,			// use the new Google Maps (Summer 2013) - https://developers.google.com/maps/documentation/javascript/basics#VisualRefresh
			disableDefaultUI: false,	// disable all default map features with one command
			panControl: false,			// enable/disable pan controls
			mapTypeControl: false,		// enable/disable map type controls
			scaleControl: true,			// enable/disable scaling (zoom) controls
			streetViewControl: false,	// enable/disable street view control
			overviewMapControl: false,	// enable/disable overview control (bottom right; small controller to see where current section of map is, in relation to e.g. Europe)
			zoomControl: true,			// enable/disable zoom control. if zoomControlOptions are set, they will override this option.
			zoomControlOptions: {		// customization of individual zoom control options - https://developers.google.com/maps/documentation/javascript/controls#ControlOptions
				style: null,
				position:null
			}
		},
		
		////////////////////////////////////////////////////////////////////////////////
	
		setMapStyle: function(mapStyle) {
			if (mapStyle && mapStyle!==null) {
				var customStyle = new google.maps.StyledMapType(
				mapStyle, {
					name: 'customStyle'
				});
				this.map.mapTypes.set('customStyle', customStyle);
				this.map.setMapTypeId('customStyle');
			}
		},//setMapStyle
		
		////////////////////////////////////////////////////////////////////////////////
	
		Marker: function(atts) {
			if(atts.baseClass.options.showLabels){
				marker = new MarkerWithLabel({
					position: atts.position,
					zIndex: atts.zIndex,
					map: atts.map,
					icon: atts.icon,
					labelContent: atts.labelContent,
					markerContent: atts.markerContent,
					labelAnchor: new google.maps.Point(12,8),
					title: atts.title,
					locationID: atts.locationID
				});
			}else{
				marker = new google.maps.Marker({
					position: atts.position,
					zIndex: atts.zIndex,
					map: atts.map,
					icon: atts.icon,
					labelContent: atts.labelContent,
					markerContent: atts.markerContent,
					title: atts.title,
					locationID: atts.locationID
				});
			}
			marker.baseClass = atts.baseClass;
			return marker;
		},//Marker
		
		////////////////////////////////////////////////////////////////////////////////
	
		makeMap: function(divID, layout) {
			if(this.controls.visualRefresh){
				google.maps.visualRefresh = true;
			}
			this.map = new google.maps.Map(document.getElementById(divID), {
				zoom: this.options.zoomlevel_default,
				center: this.centrePoint(),
				mapTypeId: this.options.mapTypeID?this.options.mapTypeID:google.maps.MapTypeId.HYBRID,
				panControl: this.controls.panControl,
				mapTypeControl: this.controls.mapTypeControl,
				scaleControl: this.controls.scaleControl,
				streetViewControl: this.controls.streetViewControl,
				overviewMapControl: this.controls.overviewMapControl,
				zoomControl: this.controls.zoomControl,
				zoomControlOptions: this.controls.zoomControlOptions
			});
			this.setMapStyle(layout);
			if(this.options.fitToBounds){
				bounds = new google.maps.LatLngBounds();
			}
			var marker, i, baseClass=this;
			for (i in this.locations) {
				if(this.locations.hasOwnProperty(i)){
					var rp = this.locations[i].rankedPosition;
					marker = new this.Marker({
						map: this.map,
						position: new google.maps.LatLng(this.locations[i].longitude, this.locations[i].latitude),
						title: this.locations[i].title,
						labelContent: rp + '',
						markerContent: this.locations[i].markerContent,
						rankedPosition: rp + '',
						zIndex: 10000 - i,
						locationID: this.locations[i].locationID,
						baseClass: this
					});
					if(this.pins[i] && this.pins[i].url && this.pins[i].offset){
						marker.setIcon({
							url: this.pins[i].url,
							anchor: new google.maps.Point(this.pins[i].offset[0],this.pins[i].offset[1])
						});
					}
					if(this.options.fitToBounds){
						bounds.extend(marker.position);
						this.map.fitBounds(bounds);
					}
					google.maps.event.addListener(marker, 'click', function(event){
						baseClass.markerClickHandler(event,this,baseClass);
					});
				}
			}
			this.addResetButton();
			this.monitorEscapeButton();
		},//makeMap
		
		////////////////////////////////////////////////////////////////////////////////
		
		centrePoint: function(){
			return new google.maps.LatLng(this.options.lat_default, this.options.lon_default);
		},//centrePoint
		
		////////////////////////////////////////////////////////////////////////////////
		
		resetMap: function(){
			this.hideOverlay();
			this.map.setZoom(this.options.zoomlevel_default);
			this.map.setCenter(this.centrePoint());
		},//resetMap
	
		////////////////////////////////////////////////////////////////////////////////
	
		markerClickHandler: function(event,marker,baseClass){
			if(baseClass.options.focus_centre){
				baseClass.map.panTo(marker.getPosition());
			}
			if(baseClass.options.focus_zoom){
				console.log('zoomy');
				baseClass.map.setZoom(baseClass.options.zoomlevel_near);
			}
			if(baseClass.options.hasInfoWindow){
				baseClass.showOverlay(baseClass.map, marker);
			}
		},//markerClickHandler
		
		////////////////////////////////////////////////////////////////////////////////
	
		showOverlay: function(map,marker){
			if(!this.infowindow){
				this.infowindow = $('<div class="overlay window"><div class="wrapper"><div class="inner"><a class="close button" href="#">' +this.text.close+ '</a><div class="content"></div></div></div></div>');
				this.infowindowContent = this.infowindow.find('div.content');
				var googlemaps_rootclass = this;
				this.infowindow.find('a.close').click(function(e){
					e.preventDefault();
					googlemaps_rootclass.hideOverlay();
				});
				$(this.map.b).append(this.infowindow);
			}
			this.fillOverlay(marker.markerContent);
			this.infowindow.show();
		},//showOverlay
		
		////////////////////////////////////////////////////////////////////////////////
	
		fillOverlay: function(content){
			if(this.infowindowContent){
				this.infowindowContent.html(content);
			}
		},//fillOverlay
		
		////////////////////////////////////////////////////////////////////////////////
	
		hideOverlay: function(){
			if(this.infowindow){
				this.infowindowContent.empty();
				this.infowindow.hide();
			}
		},//hideOverlay
		
		////////////////////////////////////////////////////////////////////////////////
	
		addResetButton: function(){
			if(this.controls.resetbutton){
				this.resetButton = $('<button class="reset">' +this.text.reset+ '</button>');
				baseClass=this;
				this.resetButton.click(function(event){
					baseClass.resetMap();
				});
				$(this.map.b).append(this.resetButton);
			}
		},//addResetButton
		
		////////////////////////////////////////////////////////////////////////////////
	
		monitorEscapeButton: function(){
			googlemaps_rootclass = this;
			$(document).keydown(function(e) {
				if(e.keyCode === 27 && googlemaps_rootclass.hideOverlay){
					googlemaps_rootclass.hideOverlay();
				}
			});
		}//monitorEscapeButton
	
	};
})();
