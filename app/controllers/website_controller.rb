class WebsiteController < ApplicationController
	def index
		@page_body_cs = "landing-page"
	end

	def features
		@page_body_cls = "features-page"
	end
end
