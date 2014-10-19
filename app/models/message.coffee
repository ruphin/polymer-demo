class Message extends Model
	instanceMembers:
		author: 'User'

Message.get = (params) ->
	processor = Api.get("http://0.0.0.0:8000/json/messages#{params.board}.json", {})
	processor.processData (messages) =>
		new Message(instance) for instance in messages
	return processor

window.Message = Message