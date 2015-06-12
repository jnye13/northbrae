class RequestDemoMailer < ActionMailer::Base
  default :from => "SMRT Signup <notifier@smrtsystems.com>"

  #Sends automatic POST to Close.io and MailChimp
  def request_demo_email(request_demo)
    @request_demo = request_demo
    
    if Rails.env.production?
    	to = "sales@smrtsystems.com"
    else
    	to = "sfgcdev@gmail.com"
    end
    mail({
    	to: to, 
    	subject: "#{@request_demo[:firstName]} #{@request_demo[:lastName]} just requested a demo."
    })

    custom = {}
    custom["Source"] = "Website request demo form"
	
	queryCloseIO = {
	    name: "#{@request_demo[:company]}",
	    contacts: [{
	      name: "#{@request_demo[:firstName]} #{@request_demo[:lastName]}",
	      emails: [{type: "office", email: "#{@request_demo[:email]}"}],
	      phones: [{type: "office", phone: "#{@request_demo[:phone]}"}]
	    }],
	    custom: custom
  	}

	authCloseIO = {:username => "b4ce5c1ca62fbf4e68e9f504e29c072029f9a31f84cc35b1c4383f6c", :password => ""}

	HTTParty.post("https://app.close.io/api/v1/lead/",
    :body => queryCloseIO.to_json,
    :basic_auth => authCloseIO,
    :verify => false,
    :headers => {
    	'Content-Type' => 'application/json'})


	merge_fields = {}
	merge_fields["FNAME"] = "#{@request_demo[:firstName]}"
	merge_fields["LNAME"] = "#{@request_demo[:lastName]}"

	authMailChimp = {:username => "", :password => "15012d12692466fe49b2aa3dea3c174e-us10"}

	queryMailChimp = {
	    email_address: "#{@request_demo[:email]}",
	    status: "subscribed",
	    merge_fields: merge_fields
  	}
	
  	HTTParty.post("https://us10.api.mailchimp.com/3.0/lists/29a85dfb26/members/", 
  		:body => queryMailChimp.to_json,
  		:basic_auth => authMailChimp,
  		:headers => {
    	'Content-Type' => 'application/json'})

  end
end