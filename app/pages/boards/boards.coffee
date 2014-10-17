Polymer "phusion-boards",

	loadData: ->
		@clearData()
		loader = Board.get()
		loader.on 'data', (data) =>
			@boards = data

	unloadData: () ->
		@clearData()

	clearData: () ->
		@boards = null
