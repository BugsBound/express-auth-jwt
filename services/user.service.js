const {User, Post} = require('../db/models');
const bcrypt = require('bcrypt');
const tokenService = require('./token.service')
const UserDto = require('../dtos/user.dto')
const ApiError = require('../exceptions/api.error')

class UserService {
  async userInfo(user) {
    const userDto = new UserDto(user);

    const tokens = tokenService.generateToken({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return {
      ...tokens,
      user: userDto
    }
  }

  async registration(login, password) {
    const checkLogin = await User.findOne({
        where: {
          login: login
        },
        raw: true
      })
    if (checkLogin) {
      throw ApiError.BadRequest(`User ${login} already exist!`)
    }

    const hashPasswd = await bcrypt.hash(password, 3);
    const user = await User.create({login, password: hashPasswd});

    return this.userInfo(user)
  }

  async login(login, password) {
    const user = await User.findOne({
        where: { login }, raw: true
    })
    if (!user) {
      throw ApiError.BadRequest('Login not found!')
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      throw ApiError.BadRequest('Wrong password!')
    }

    return this.userInfo(user)
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken)
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizationError();
    }

    const userData = tokenService.validateToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizationError();
    }

    const user = await User.findOne({
      where: {id: userData.id}})

    return this.userInfo(user)
  }

  async getUsers() {
    const users = await User.findAll({attributes: ['id', 'login'],raw: true})
    console.log(users)
    return users
  }

  async getUser(query) {
    let user = await User.findOne({
      where: {login: query},
      attributes: ['id', 'login'],
      raw: true
    })

    if (!user) {
      throw ApiError.NotFound('User not found!')
    }

    const posts = await Post.findAll({
      attributes: ['id', 'title'],
      where: {user_id: user.id},
      raw: true})

    return {id: user.id, login: user.login, posts};
  }
}

module.exports = new UserService();
