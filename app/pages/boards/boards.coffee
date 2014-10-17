Polymer "phusion-boards",

	loadData: ->
		loader = Board.get()
		loader.onData (data) =>
			@boards = data