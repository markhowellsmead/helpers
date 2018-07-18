<div id="file-uploader">
	<noscript>			
		<p>Please enable JavaScript to use file uploader.</p>
	</noscript>         
</div>

<!-- requires jquery! -->
<script src="fileuploader.js"></script><!-- uploader class -->
<script src="frappant_uploader.js"></script><!-- frappant functions -->
<script>
    $(document).ready(function(){
	    FRP_UPLOADER = new frappant_uploader();
    	FRP_UPLOADER.init({
			upload:'/upload/',
			save:'/save/',
			send:'/send/'
		});
	    FRP_UPLOADER.createUploader();
    });
</script>