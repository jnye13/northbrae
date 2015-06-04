module ApplicationHelper

	def responsive_image(path, extra_cls="")
		image_tag path, class: ('img-responsive' + extra_cls)
	end

	def nav_item(name, path, conditions = nil)
		cls = 'nav-item'
		if matches_page?(conditions)
			cls += ' active'
		end
		content_tag(:li, link_to(name, path), class: cls)
	end
end
