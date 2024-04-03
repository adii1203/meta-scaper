class ApiResponce {
  constructor(status, success, message, data) {
    this.success = status < 400;
    this.message = message;
    this.data = data;
    this.status = status;
  }
}

export default ApiResponce;
