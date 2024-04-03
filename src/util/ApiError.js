class ApiError extends Error {
  constructor(status, message = " something went wrong ", error, stack) {
    super(message);
    this.message = message;
    this.status = status;
    this.error = error;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
