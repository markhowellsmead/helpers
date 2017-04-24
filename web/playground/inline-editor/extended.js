if (!String.prototype.trim) {String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};}

if (!window.console) console = {};
console.log = console.log || function(){};
console.warn = console.warn || function(){};
console.error = console.error || function(){};
console.info = console.info || function(){};

(function($){

	$.extend($.fn, {

		addProgressHolder: function(){
			if(!$(this).data('hasProgressHolder')){
				$(this).data('hasProgressHolder',true).find('input[type=submit]:first').before('<div class="progressmessage">'+$.validator.messages['inprogress']+'</div>');
			}
			return this;
		},

		formReset: function(){
			this.reset();
		},

		showMessage: function(message,mode){
			this.attr('class',this.data('defaultClass'));
			var messageHolder = (inner=this.find('div.textholder')) ? inner : this;
			messageHolder.html('');
			if(message){
				if(!mode){mode='hint';}
				this.addClass(mode);
				messageHolder.html(message);
				this.comeIn('fast');
			}
		},
		comeIn: function(speed){
			this.slideDown(speed);
			return this;

		},
		goOut: function(speed){
			this.hide(0,function(){
				t=$(this);
				messageHolder = (inner=t.find('div.textholder')) ? inner : t;
				messageHolder.html('');
				t.attr('class',t.data('defaultClass'));
			});
			return this;
		},

		formBindReset: function(){
			$(this).bind('reset', function() {
				$(this).find('.results').empty();
				$(this).find('.formmessage').empty();
				$(this).find(':first').focus();
			});
			return this;
		},

		wait: function(delay){
			elm=$(this);
			if(delay){
				elm.addProgressHolder();
				$.doTimeout('ajaxping', 1000, function(){
					elm.addClass('wait');
				});
			}else{
				elm.addClass('wait');
			}
			return this;
		},

		unwait: function(){
			$.doTimeout('ajaxping',true);
			$(this).removeClass('wait');
		},

		activateComparator: function(){
			// for single email field
			comparatorWrapper = $('label[for="'+$(this).attr('id')+'_compare"]');
			if(comparatorWrapper){
				comparatorWrapper.hide();
				$(this).data('comparatorWrapper',comparatorWrapper);
				$(this).data('original',$(this).val());
				$(this).updateSavedValue();
				$(this).change(function(){
					$(this).compareWithOriginal();
				});
			}
			return $(this);
		},

		deactivateComparators: function(){
			// for whole form
			comparatorWrappers = $(this).find('label[for*="_compare"]');
			if(comparatorWrappers){
				comparatorWrappers.hide();
			}
			return $(this);
		},
		
		eitherOr: function(fieldname1,fieldname2){
			// either fieldname1 or fieldname2 must be filled out.
			$(this).find('input[name='+fieldname1+']:first').data('otherfield',$(this).find('input[name='+fieldname2+']:first'));
			$(this).find('input[name='+fieldname2+']:first').data('otherfield',$(this).find('input[name='+fieldname1+']:first'));
			$(this).find('input[name='+fieldname1+'],input[name='+fieldname2+']').bind('keyup mouseup change touchend paste',function(){
				if($(this).val()){
					$(this).data('otherfield').removeClass('required error');
				}else{
					$(this).data('otherfield').addClass('required');
				}
			});
			return this;
		},//eitherOr

		updateSavedValue: function(){
			$(this).data('saved',$(this).val());
			return $(this);
		},

		compareWithOriginal: function(){
			$this=$(this);
			if($this.data('original')!==false && $this.data('comparatorWrapper')){
				comparatorWrapper = $this.data('comparatorWrapper');
				if($this.val()!==$this.data('original')){
					comparatorWrapper.show();
					comparatorWrapper.find('input:first').focus().val('');
				}else{
					comparatorWrapper.hide();
				}
			}
		},

		resetComparator: function(){
			$(this).attr('data-original',$(this).val());
			comparatorWrapper = $('label[for="'+$(this).attr('id')+'_compare"]');
			if(comparatorWrapper){
				comparatorWrapper.addClass('hidden').find('input:first').val('');
			}
		}
	})
})(jQuery);