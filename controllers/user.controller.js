const userService = require('../services/user.service')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api.error')

class UserController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest('Validation Error!', errors.array()))
      }

      const {login, password} = req.body;
      const userData = await userService.registration(login, password)
      req.session.refreshToken = userData.refreshToken
      req.session.user = userData.user
      return res.json(userData)
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const {login, password} = req.body;
      const userData = await userService.login(login, password)
      req.session.refreshToken = userData.refreshToken
      req.session.user = userData.user
      return res.json(userData)
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      const {refreshToken} = req.session
      const token = await userService.logout(refreshToken)
      req.session.destroy()
      res.clearCookie('sid')
      return res.status(200).end()
    } catch (err) {
      next(err);
    }
  }

  async refresh(req, res, next) {
    try {
      const {refreshToken} = req.session
      console.log('!!!!!!!!!!<<<< OLD: ' + req.session.refreshToken)
      const userData = await userService.refresh(refreshToken)
      req.session.user = userData.user
      req.session.refreshToken = userData.refreshToken
      console.log('!!!!!!!!!!>>>> NEW: ' + req.session.refreshToken)
      return res.json(userData)

    } catch (err) {
      next(err);
    }
  }

  user(req, res, next) {
    try {

    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
