$(document).on("page:change",function(){
	var isVisible = $( "#requestDemo" ).is( ":visible" );
	$('#btn-request-demo').click(function(){
		$('#requestDemo').toggle('fast',function(){
			if(isVisible){
				isVisible = false;
			}else{
				isVisible = true;
			}
			$(this).find('#signup_name').focus();
		});
	});
	function closeSignup(){
  		$('#requestDemo').toggle('fast',function(){});
	}
	var $cancel = $('#btn-signup-cancel').click(closeSignup);
	$('#btn-signup-done').click(closeSignup);

	var $requestDemo = $('#requestDemo');

	$('#requestDemoForm').bind('submit', function(ev){

		ev.preventDefault();

		var $this = $(this),
			$progress = $requestDemo.find('.progress');
			$progress.css('visibility','visible'),
			$requestDemoFormTab = $requestDemo.find('.requestDemoFormTab'),
			$requestDemoThanks = $requestDemo.find('.requestDemoThanks'),
			$wrapper = $requestDemo.children().first(),
			$submit = $this.find('[type=submit]');
		
		if($submit.hasClass('disabled')){
			return;
		}
		
		$submit.addClass('disabled');
		$cancel.addClass('disabled');
		
		$.ajax({type: "POST", url: $this.attr('action'), data: $this.serialize(), success: function(){
			$requestDemoFormTab.animate({'margin-left':'-355px'},function(){});
			$requestDemoThanks.animate({'margin-left':'0px'});
			$wrapper.animate({'height':'126px'});
		}});
	});

	
	$('body').click(function(evt){
		if(isVisible){
			console.log(evt.target.id);
	       	if($(evt.target).closest('#requestDemo').length)
	          	return; 
	        if($(evt.target).closest('.btn-cta-secondary').length)
	      		return;

			$('#requestDemo').toggle('fast');
			isVisible = false;
		}
	});

	function in_progress_callback() {
    	console.log("in_progress_callback")
	}
	function success_callback(data) {
    	console.log("success_callback",data)
    	var email_validation_error = $('#email_validation_error')
    	var submit_button = $('#btn-request-demo-submit')
    	var isToggled = email_validation_error.is( ":visible" );
    	if(data['is_valid'] == false && !isToggled){
    		email_validation_error.toggle('fast')//.css('visibility','visible')
    		submit_button.toggle('fast')
    	}else if(data['is_valid'] == true && isToggled){
    		email_validation_error.toggle('fast')
    		submit_button.toggle('fast')
    	}
	}
	function validation_error() {
		console.log("validation_error")
    	$('email_validation_error').css('visibility','visible')
	}

	var $email = $('#request_demo_email');

	$email.mailgun_validator({
       api_key: 'pubkey-83785693bd76033d421095a9489bcf9f',
       in_progress: in_progress_callback, // called when request is made to validator
       success: success_callback,         // called when validator has returned
       error: validation_error           // called when an error reaching the validator has occured
   });
});


