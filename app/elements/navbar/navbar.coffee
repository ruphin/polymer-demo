Polymer "phusion-navbar",
	cache: 
		initialized: false
		boards: {}

	ready: () ->
		@asyncFire('registerDataLoader', @)

	loadData: () ->
		if !@cache.initialized
			@cache.initialized = true
			loader = Board.get()
			loader.on 'data', (boards) =>
				boards.forEach (board) =>
					@cache.boards[board.id] = board
