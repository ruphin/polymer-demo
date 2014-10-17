class Board extends Model
	constructor: (data) ->
		data.url = "#/boards/#{data.id}/"
		super(data)

Board.get = (params) ->
	processor = Api.get("http://demo2452101.mockable.io/boards.json", params)
	processor.processData (boards) =>
		new Board(instance) for instance in boards
	return processor

window.Board = Board