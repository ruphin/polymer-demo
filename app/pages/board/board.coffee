Polymer "phusion-board",

	loadData: (params) ->
		@clearData()
		loader = Message.get({board: params['board']})
		loader.on 'data', (messages) =>
			@messages = messages

	unloadData: () ->
		@clearData()

	clearData: () ->
		@messages = null
