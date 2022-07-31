const ApiError = require('../exceptions/api.error');
const tokenService = require('../services/token.service')

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    console.log(authorizationHeader)
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizationError())
    }

    const accessToken = authorizationHeader.split(' ').at(-1);
    if (!accessToken) {
      return next(ApiError.UnauthorizationError())
    }

    const userData = tokenService.validateToken(accessToken, true);
    if (!userData) {
      return next(ApiError.UnauthorizationError())
    }

    req.session.user = userData
    next()
  } catch (err) {
    return next(ApiError.UnauthorizationError())
  }
}
