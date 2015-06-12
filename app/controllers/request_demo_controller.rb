class RequestDemoController < ApplicationController
  def create
    request_demo = params[:request_demo]
    
    RequestDemoMailer.request_demo_email(request_demo).deliver_now
    
    #redirect_to(root_path, notice: 'Demo request was successfully sent.')
    render :nothing => true
  end
end
