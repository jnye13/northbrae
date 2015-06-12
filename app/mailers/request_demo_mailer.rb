class RequestDemoMailer < ActionMailer::Base
  default :from => "SMRT Signup <notifier@smrtsystems.com>"
	 #Just for test - to be replaced by:
    #"admin@smrtsystems.com, bill@smrtsystems.com"
  
  def request_demo_email(request_demo)
    @request_demo = request_demo
    
    if Rails.env.production?
    	to = "sales@smrtsystems.com"
    else
    	to = "sfgcdev@gmail.com"
    end
    mail({
    	to: to, 
    	subject: "#{@request_demo[:name]} just requested a demo."
    })

    custom = {}
    custom["Source"] = "Website request demo form"
	
	query = {
	    name: "#{@request_demo[:company]}",
	    contacts: [{
	      name: "#{@request_demo[:name]}",
	      emails: [{type: "office", email: "#{@request_demo[:email]}"}],
	      phones: [{type: "office", phone: "#{@request_demo[:phone]}"}]
	    }],
	    custom: custom
  	}

	auth = {:username => "b4ce5c1ca62fbf4e68e9f504e29c072029f9a31f84cc35b1c4383f6c", :password => ""}

	response = HTTParty.post("https://app.close.io/api/v1/lead/",
    :body => query.to_json,
    :basic_auth => auth,
    :verify => false,
    :headers => {
    	'Content-Type' => 'application/json'})

	print response
  end
end
