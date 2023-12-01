var express = require('express');
var router = express.Router();
const userModel = require('./users');
const jwt = require('jsonwebtoken');
let secretKey = 'hardika';
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/register', async function (req, res) {
    const { username, password, email, firstname, lastname, mobile } = req.body;
    let userFound = await userModel.findOne({ username: username });
    if (userFound) {
        return res.status(404).json({ message: 'Username is already Exists' });
    }
    userFound = await userModel.findOne({ email: email });
    if (userFound) {
        return res.status(404).json({ message: 'User email is already Exists' });
    }
    const userData = await userModel.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        password: password,
        mobile: mobile,
        created_at: new Date(),
    });
    const userToken = {
        firstname: userData.firstname,
        lastname:  userData.lastname,
        email:  userData.email,
        username:  userData.username,
        password:  userData.password,
        mobile:  userData.mobile,
        created_at:  userData.created_at,
    };
    const token = jwt.sign(userToken, secretKey);
    jwt.verify(token, secretKey, (err) => {
        if (err) {
            console.error('Token verification failed:', err.message);
        } else {
          res.status(200).json({ message: 'User Register Success', data: userData, token: token });
        }
    });
});

router.post('/login', async function (req, res) {
    try {
        const { username, password } = req.body;
        let userFound;

        if (username.includes('@')) {
            userFound = await userModel.findOne({ email: username });
        } else {
            userFound = await userModel.findOne({ username: username });
        }

        if (!userFound) {
            return res.status(500).json({ message: 'User Not Found' });
        }

        if (password !== userFound.password) {
            return res.status(404).json({ message: 'Username/Email or Password not match' });
        }
        const userToken = {
          firstname: userFound.firstname,
          lastname:  userFound.lastname,
          email:  userFound.email,
          username:  userFound.username,
          password:  userFound.password,
          mobile:  userFound.mobile,
          created_at:  userFound.created_at,
      };
      const token = jwt.sign(userToken, secretKey);
      jwt.verify(token, secretKey, (err) => {
          if (err) {
              console.error('Token verification failed:', err.message);
          } else {
            res.status(200).json({ message: 'User Log In Success', data: userFound, token: token });
          }
      });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
