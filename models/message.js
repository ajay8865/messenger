class message{
	constructor(text, author){
		this.text = text;
		this.author = author;
	}

	getText(){
		return this.text;
	}

	getAuthor(){
		return this.autor;
	}

	setText(text){
		this.text = text;
	}

	setAuthor(author){
		this.author = author;
	}
}

module.exports = message;