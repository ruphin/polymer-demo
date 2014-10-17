class Board extends Notification

Board.get = (params) ->
	processor = USApi.getData("boards", params)
	processor.processData (boards) =>
		new Board(instance) for instance in boards
	return processor

window.Board = Board