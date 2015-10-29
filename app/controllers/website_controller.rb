class WebsiteController < ApplicationController
	def index
		@page_body_cls = "index"
	end

	def faqs
		@page_body_cls = "faqs"
	end

	def pricing
	end

	def signup
		@page_body_cls = "signup-page access-page has-full-screen-bg"
	end
end
