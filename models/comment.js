class Comment{
	constructor(messageId, text, author){
		this.messageId = messageId;
		this.text = text;
		this.author = author;
	}

	getMessageId(){
		return this;
	}

	getText(){
		return text;
	}

	getAuthor(){
		return author;
	}

	setText(text){
		this.text = text;
	}

	setAuthor(author){
		this.author = author;
	}
}

module.exports = Comment;