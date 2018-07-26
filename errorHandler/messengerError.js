class MessengerError extends Error {
  constructor (obj) {
    super(obj.error_message);
    Error.captureStackTrace( this, this.constructor );
    this.name = 'Messenger Error';
    this.message = obj.error_message;
    this.error_code = obj.error_code;
    this.error_message = obj.error_message;
  }
}

module.exports = MessengerError;