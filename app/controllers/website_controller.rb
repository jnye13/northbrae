class WebsiteController < ApplicationController
	def index
		@page_body_cs = "landing-page"
	end

	def features
		@page_body_cls = "features-page"
	end

	def signup
		@page_body_cls = "signup-page access-page has-full-screen-bg"
	end
end
