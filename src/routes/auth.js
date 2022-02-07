const {Router} = require('express')
const { getUsers, register, login, protected, logout, } = require('../controllers/auth')
const { userAuth } = require('../middlewares/auth-middleware')
const { validationMiddleware } = require('../middlewares/validations-middleware')
const { registerValidation, loginValidation } = require('../validators/auth')

const router = Router()

router.get('/get-users', getUsers)
router.get('/protected', userAuth, protected)
router.get('/logout', userAuth, logout)
router.post('/register', registerValidation, validationMiddleware, register)
router.post('/login', loginValidation, validationMiddleware, login)

module.exports = router
