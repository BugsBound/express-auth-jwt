module.exports = class ApiError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizationError() {
    return new ApiError(401, 'Not auth!')
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
}