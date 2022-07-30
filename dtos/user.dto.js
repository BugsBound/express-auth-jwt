module.exports = class UserDto {
  constructor(model) {
    this.login = model.login;
    this.id = model.id;
  }
}
