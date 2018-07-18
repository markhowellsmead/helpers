"use strict";

//////////////////////////////////////////////////
	
var Frp_inline_uploader = function(){

	var translations = {
		'default': {
			fail_opentempdir: 'Failed to open temp directory',
			fail_openoutput: 'Failed to open output stream',
			fail_movefile: 'Failed to move uploaded file',
			fail_getfile: 'Failed to open input stream',
			upload_unsuccessful: 'File upload unsuccessful'
		},
		'de': {
			fail_opentempdir: 'Konnte das temporäre Verzeichnis nicht lesen',
			fail_openoutput: 'Konnte die Ausgabekanal nicht aufmachen',
			fail_movefile: 'Konnte die temporäre Datei nicht in den Zielverzeichnis verschieben',
			fail_getfile: 'Konnte nicht auf die Datei zugreifen',
			upload_unsuccessful: 'Die Datei konnte nicht aufgeladen werden'
		},
		'fr': {
			fail_opentempdir: 'Konnte das temporäre Verzeichnis nicht lesen',
			fail_openoutput: 'Konnte die Ausgabekanal nicht aufmachen',
			fail_movefile: 'Konnte die temporäre Datei nicht in den Zielverzeichnis verschieben',
			fail_getfile: 'Konnte nicht auf die Datei zugreifen',
			upload_unsuccessful: 'Die Datei konnte nicht aufgeladen werden'
		}
	};
	
	var messages = translations['default'];

	//////////////////////////////////////////////////

	var lang = 'default';		// interface language. change by setting the "lang" attribute on the <html> element
	var pluploader = null;		// the base pluploader object
	var responseData = Array();	// parsed response data from ajax request 
	var fileName = ''; 			// the name of the stored file name, returned from ajax
	var storageFolder = null;	// the path to the storage folder on the server
	var previewImage = null; 	// jQuery object of preview image after successful upload
	var hiddenField = null;		// the hidden form field containing the filename of the image (not the path, just the file name)
	var containers = Array(); 	// jQuery HTML objects for list container, upload container etc;

	//////////////////////////////////////////////////

	this.make = function(atts){
	
		setTranslations();
		setContainers(atts);
		setStorageFolder(containers.folder);

		pluploader = new plupload.Uploader({
			multi_selection:false,
			runtimes : 'html5,flash,silverlight',
			browse_button : containers.link_select.attr('id'), // you can pass in id...
			container: containers.container, // ... or DOM Element itself
			url : containers.uploader+'?folder='+containers.folder,
			flash_swf_url : '../js/Moxie.swf',
			silverlight_xap_url : '../js/Moxie.xap',
			
			filters : {
				max_file_size : '32mb',
				mime_types: [
					{title : "Image files", extensions : "jpg,gif,png"}
				]
			},
		
			init: {
				PostInit: function() {
					containers.filelist.html('');
					containers.link_upload.click(function(e){
						e.preventDefault();
						pluploader.start();
					});
				},
		
				UploadProgress: function(up, file) {
					$('b',containers.filelist).html('<span>' + file.percent + '%</span>');
				},
		
				Error: function(up, err) {
					containers.console.append("\nError #" + err.code + ': ' + err.message);
				}
			}
		});

		pluploader.init();
		pluploader.bind('FilesAdded', update_filelist);
		pluploader.bind('FileUploaded',file_uploaded);

		
	}//make

	//////////////////////////////////////////////////
	// getters and setters

	var setTranslations = function(){
		lang = $('html').attr('lang');
		if(translations[lang]){
			messages = translations[lang];
		}
	}//setTranslations
	
	var setContainers = function(atts){
		containers = atts;
		containers.container = containers.container[0];
	}//setContainers
	
	var setStorageFolder = function(folder){
		storageFolder = folder;
	}//setStorageFolder
	
	var setResponseData = function(xhr){
		responseData = $.parseJSON(xhr.response);
		setImageName();
	}//setResponseData

	var setImageName = function(){
		if(responseData && responseData.status==200 && responseData.result){
			fileName = responseData.result;
		}
	}//setImageName

	//////////////////////////////////////////////////
	// handler functions
	
	var uploadSuccessful = function(){
		return (responseData && responseData.status && responseData.status==200);
	}//uploadSuccessful
	
	var file_uploaded = function(uploader,file,xhr){
		setResponseData(xhr);
		if(!uploadSuccessful()){
			alert(this.messages.upload_unsuccessful);
		}else{
			update_view();
		}
	}//file_uploaded
	
	var update_filelist = function(up, files) {
	    if(pluploader.files.length == 2){
			pluploader.removeFile(uploader.files[0]);
		}
	    $.each(files, function(i, file) {
	        containers.filelist.html(
				'<div id="' + file.id + '">' + file.name + ' (' + plupload.formatSize(file.size) + ') <b></b>' + '</div>');
	    });
	    up.refresh(); // Reposition Flash/Silverlight
	}//update_filelist
	
	var update_view = function(){
		makePreviewImage();
		swapOutUploader();
	}//update_view

	var swapOutUploader = function(){
		containers.filelist.empty().append(previewImage);
		containers.formfield.val(fileName);
		containers.controls.hide();
	}//swapOutUploader
	
	var makePreviewImage = function(){
		previewImage = $('<img src="' +storageFolder+fileName+ '"/>');
	}//makePreviewImage

}//Frp_inline_uploader

//////////////////////////////////////////////////

var frp_inline_uploader = new Frp_inline_uploader();
frp_inline_uploader.make({
	fieldname: 		'bild',
	uploader: 		'upload.php',
	folder: 		'uploads/tx_frpveranstaltungen/',	// you need to set this path in the upload.php file too!
	container:		$('#plupload_container'),
	filelist: 		$('#plupload_filelist'),
	link_select:	$('#plupload_pickfiles'),
	link_upload: 	$('#plupload_uploadfiles'),
	controls:		$('#plupload_controls'),
	console:		$('#plupload_console'),
	formfield:		$('input[name="bild"]')
});