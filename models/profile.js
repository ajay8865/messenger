class profile{
	constructor(firstname, lastname, email){
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
	}

	getEmail(){
		return this.email;
	}

	setEmail(email){
		this.email = email;
	}

	getFirstname(){
		return this.firstname;
	}

	setFirstname(name){
		this.firstname = firstname;
	}

	getLastname(){
		return this.lastname;
	}

	setLastname(lastname){
		this.lastname = lastname;
	}
}

module.exports = profile;