$(document).on("page:change",function(){


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
    		submit_button.addClass('disabled')
    	}else if(data['is_valid'] == true && isToggled){
    		email_validation_error.toggle('fast')
    		submit_button.removeClass('disabled')
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

  $('#requestDemoForm').submit(function(ev){
      ev.preventDefault();
      var $this = $(this),
        $submit = $this.find('[type=submit]');
      
      if($submit.hasClass('disabled')){
        return;
      }
      
      $submit.addClass('disabled');
      
      $.ajax({type: "POST", url: $this.attr('action'), data: $this.serialize(), success: function(){
        $('#requestDemoModal').modal('hide')
        $('#thankYouModal').modal('show');
        if(analytics){
          analytics.track('Demo Requested')
        }
      }});
    });


});


