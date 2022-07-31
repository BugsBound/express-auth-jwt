const express = require('express');
const router = express.Router();
const {User, Post} = require('../db/models');
const userController = require('../controllers/user.controller')
const {body} = require('express-validator')
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/users', authMiddleware, userController.getUsers)

router.get('/user/:login', authMiddleware, userController.getUserByLogin)

router.post('/login', userController.login)

router.post('/register',body('password').isLength({min: 6, max: 32}), userController.registration)

router.get('/logout', userController.logout)

router.get('/refresh', userController.refresh)

module.exports = router;
