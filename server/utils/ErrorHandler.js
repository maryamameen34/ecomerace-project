class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message); // Call the parent class (Error) constructor
    this.statusCode = statusCode;
    this.stack = (new Error()).stack;
  }
}

module.exports = ErrorHandler;
