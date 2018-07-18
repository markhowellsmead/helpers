function frappant_uploader(){};

frappant_uploader.prototype.init = function(pages){
	this._pages  = pages;
	this._replyHolder = document.getElementById('file-uploader');
}

frappant_uploader.prototype.createUploader = function(){
    var uploader = new qq.FileUploader({
        element: this._replyHolder,
        action: this._pages['upload'],
        onComplete: function(id, fileName, responseJSON){
        	$(this.element).html(responseJSON.content);
        },
        debug: false
    });
}