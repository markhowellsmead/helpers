!function(){"use strict";var e={n:function(t){var a=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(a,{a:a}),a},d:function(t,a){for(var r in a)e.o(a,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:a[r]})},o:function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}},t=window.wp.blocks,a=window.wp.blockEditor,r=window.wp.components,n=window.wp.i18n,i=window.wp.serverSideRender,l=e.n(i),o=JSON.parse('{"apiVersion":2,"name":"sht/carousel","title":"Karussell","category":"media","icon":"format-image","description":"","keywords":[],"textdomain":"sha","supports":{"align":false,"html":false},"style":["file:./dist/styles/view.min.css"],"editorScript":"file:./dist/scripts/editor.js","attributes":{"blockId":{"type":"string"},"images":{"type":"array","items":{"type":"integer"}},"updated":{"type":"integer"}},"render":"file:./render.php"}');const{name:s}=o;(0,t.getBlockDefaultClassName)(s),(0,t.registerBlockType)(s,{edit:e=>{let{attributes:t,setAttributes:i,clientId:o}=e;const d=(0,a.useBlockProps)(),{images:c,updated:u}=t;return i({blockId:o}),React.createElement("div",d,React.createElement(a.InspectorControls,null,React.createElement(r.PanelBody,{title:(0,n._x)("Bilder","PanelBody title","sha")},React.createElement(a.MediaUploadCheck,null,React.createElement(a.MediaUpload,{onSelect:e=>{let t=[];e.map((e=>{t.push(e.id)})),i({images:t,updated:Date.now()})},allowedTypes:["image"],value:c||void 0,multiple:!0,gallery:!0,addToGallery:!1,render:e=>{let{open:t}=e;return React.createElement(r.Button,{variant:"primary",onClick:t},c?(0,n._x)("Bildauswahl anpassen","Media control button text","sha"):(0,n._x)("Bilder auswählen","Media control button text","sha"))}})))),c&&React.createElement(l(),{block:s,attributes:{images:c,updated:u}}),!c&&React.createElement("div",{className:"c-editormessage c-editormessage--error"},"Keine Bilder ausgewählt."))}})}();