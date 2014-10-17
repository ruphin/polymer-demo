class Board extends Notification

Board.get = (params) ->
	processor = Api.get("boards", params)
	processor.processData (boards) =>
		new Board(instance) for instance in boards
	return processor

window.Board = Board