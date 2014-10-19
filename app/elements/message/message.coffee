Polymer "phusion-message",

	ready: () ->
		console.log(@message)
		if @message?
			@['data-avatar'] = "http://www.gravatar.com/avatar/#{md5(@message.author.email)}?s=48" 
