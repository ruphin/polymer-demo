class Message extends Model

Message.get = (params) ->
	processor = Api.get("http://demo2452101.mockable.io/messages.json", params)
	processor.processData (messages) =>
		new Message(instance) for instance in messages
	return processor

window.Message = Message