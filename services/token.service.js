const jwt = require('jsonwebtoken')
const {Token} = require("../db/models");

class TokenService {
  generateToken(payload) {
    const accessToken = jwt.sign(
      payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'}
    )
    const refreshToken = jwt.sign(
      payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'}
    )

    return {
      accessToken,
      refreshToken
    }
  }

  validateToken(token, isAccess = false) {
    try {
      const secret = isAccess ? process.env.JWT_ACCESS_SECRET : process.env.JWT_REFRESH_SECRET
      const userData = jwt.verify(token, secret)
      return userData
    } catch (err) {
      return null;
    }
  }

  async saveToken(user_id, token) {
    let newToken;
    try {
      const userToken = await Token.findOne({
        where: {user_id}
      })

      if (userToken) {
        newToken = await Token.update({token}, {where: {user_id}})
      } else {
        newToken = await Token.create({user_id, token})
      }

    } catch (err) {
      throw new Error(err.message)
    }
    return newToken;
  }

  async removeToken(token) {
    const tokenData = await Token.destroy({
      where: {token}
    })
    console.log(!(tokenData === 0))
    return !(tokenData === 0);
  }

  async findToken(token) {
    const tokenData = await Token.findOne({
      where: {token}
    })
    return tokenData;
  }
}

module.exports = new TokenService();
