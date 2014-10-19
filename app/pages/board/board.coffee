Polymer "phusion-board",

	loadData: (params) ->
		@clearData()
		@board = params.board
		loader = Message.get({board: @board})
		loader.on 'data', (messages) =>
			@messages = messages

	clearData: () ->
		@messages = null
