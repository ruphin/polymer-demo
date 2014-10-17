Polymer "phusion-boards",

	loadData: ->
		loader = Board.get()
		loader.on 'data', (data) =>
			@boards = data