class User extends Model
	constructor: (data) ->
		data.gravatar = "http://www.gravatar.com/avatar/#{md5(data.email)}?s=96"
		super(data)