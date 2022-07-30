const express = require('express');
const router = express.Router();
const {User, Post} = require('../db/models');
const userController = require('../controllers/user.controller')
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/users', authMiddleware, async (req, res) => {
  let users
  try {
    users = await User.findAll()
  } catch (err) {
    res.status(500).json({message: err.message})
    return -1;
  }
  res.json(users.map(el => {return {login: el.login, id: el.id}}))
})

router.get('/user/:id', authMiddleware, async (req, res) => {
  let user, posts;
  try {
    user = await User.findOne({where: {id: req.params.id}})
    if (!user) {
      res.status(404).json({message: 'User not found!'})
    }
    posts = await Post.findAll({
      attributes: ['id', 'title'],
      where: {user_id: req.params.id},
      raw: true})
  } catch (err) {
    res.status(500).json({message: err.message})
    return -1;
  }
  res.json({login: user.login, id: user.id, posts})
})

router.post('/login', userController.login)

router.post('/register',body('password').isLength({min: 6, max: 32}), userController.registration)

router.get('/logout', userController.logout)

router.get('/refresh', userController.refresh)

module.exports = router;
