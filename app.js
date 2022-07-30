require('dotenv').config();
const express = require('express');
const path = require('path');
const sessions = require('express-session');
const FileStore = require('session-file-store')(sessions);
const fileUpload = require('express-fileupload');
const {sequelize} = require('./db/models');
const errorMiddleware = require('./middlewares/error.middleware')

const PORT = process.env.PORT || 5000;

const user = require('./routes/users')
const app = express();
const cors = require('cors')


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use(fileUpload({}));
app.use(sessions({
    store: new FileStore(),
    name: 'sid',
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true
    }
  }
))

app.use('/api', user)

app.use(errorMiddleware)

app.listen(PORT, async () => {
  console.log('Server started!\nPORT:', PORT)

  try {
    await sequelize.authenticate();
    console.log('DB connected!');
  } catch (error) {
    console.log('Fail DB connect:');
    console.log(error.message);
  }
})
