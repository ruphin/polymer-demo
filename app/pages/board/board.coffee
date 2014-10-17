Polymer "phusion-board",

	loadData: (params) ->
		loader = Message.get({board: params['board']})
		loader.onData (messages) =>
			@messages = messages