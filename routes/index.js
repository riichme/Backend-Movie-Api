var express = require('express');
var router = express.Router();
const movieRouter = require('./movieRouter')
const UserController = require('../controllers/userController.js')
const { authentication } = require("../middleware/auth.js")

/* GET home page. */
router.get('/', function(req, res,) {
  res.render('index', { title: 'Express' });
});

router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginUser)

router.use(authentication)
router.use("/movies", movieRouter)

module.exports = router;
