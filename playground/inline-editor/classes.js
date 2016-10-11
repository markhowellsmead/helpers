var frp_inline_editor = function(){

	var throwError 	= function(message){console.error(message);}
	var log 		= function(message){console.log(message);}
	
	//////////////////////////////////////////////////
	
	var ajaxBasePath = 'engine.php',currentForm=null, messageholder=null, interfaceLanguage='de';
	
	this.setAjaxBasePath = function(newvalue){
		if(newvalue.trim!==''){
			ajaxBasePath = newvalue;
		}else{
			throwError('setAjaxBasePath: ajaxBasePath is empty');
		}
	}

	this.getAjaxBasePath = function(){
		return ajaxBasePath;
	}

	this.getInterfaceLanguage = function(){
		return interfaceLanguage;
	}

	this.setMessageHolder = function(targetObject){
		messageholder = targetObject;
		if(!messageholder){
			throwError('setMessageHolder: messageholder object does not exist');
		}
	}

	this.getMessageHolder = function(){
		return messageholder;
	}

	//////////////////////////////////////////////////

	this.construct = function(){

		interfaceLanguage = $('html').attr('lang');
		
		$.getScript('messages_'+interfaceLanguage+'.js');

		$('form[name=edit_address]').validate({
			errorElement:'span',
			submitHandler: this.saveAddress,
			invalidHandler: this.formError
		});

	};//init
	
	//////////////////////////////////////////////////
	
	this.formError = function(form, validator){

	};//formError


	var standardAjaxFunction = function(getPath,fnSuccess,fnError,currentForm){
		this.currentForm = currentForm;
		successFunction	= fnSuccess ? function(data){fnSuccess(data)} : function(data){handlejSONResponse(data);}
		errorFunction 	= fnError ? function(data){fnError(data)} : function(data){handlejSONResponse(data);}
		$.ajax({
			url:		getPath,
			data: 		this.currentForm.serializeArray(),
			type: 		'POST',
			dataType: 	'json',
			success: 	successFunction,
			error: 		errorFunction
		});
	};//standardAjaxFunction


	var handlejSONResponse = function(data){

		if(data && data.status){
			switch(data.status){
				case 200:// Show message as toolbar
					alert('ok');
					showMessage(data.result,'ok');
					break;

				case 201: // Download file
					showMessage(data.result,'ok');
					break;

				case 202: // Show alert message
					alert(data.result);
					break;

				case 207: // dataset
					//if(callbackFunction){callbackFunction(data);}
					showMessage(data.result,'ok');
					break;

				case 302://redirect
					alert('redirect to '+data.result);
					//self.location.replace(data.result);// break the back button!
					break;

				case 400:// Nur Meldung hinten anhängen
					showMessage(data.result,'error');
					break;

				case 404:// Nur Meldung hinten anhängen
					showMessage(data.statusText,'error');
					throwError('handlejSONResponse: ajax request returned 404');
					break;
			}
			
			this.currentForm.unwait();
		}
	};//handleJSONResponse
	
	//////////////////////////////////////////////////
	
	var showMessage = function(message,mode){
		if(messageholder && message!==''){
			messageholder.showMessage(message,mode);
		}
	};//messageHandler
	
	//////////////////////////////////////////////////
	
	this.saveAddress = function(currentForm){
		currentForm = $(currentForm);
		currentForm.find(':input').blur();
		currentForm.wait(true);
		/*var disabled_elements = currentForm.find(':input:disabled').removeAttr('disabled');
		var fields = currentForm.serialize();
		disabled_elements.attr('disabled','disabled');*/
		getPath = ajaxBasePath+'?mode=address_save';
		standardAjaxFunction(getPath,null,null,currentForm);
	}//saveAddress


};//frp_inline_editor