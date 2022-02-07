const {Router} = require('express')
const {addExercise, addSession, getSessions} = require('../controllers/session')
const { userAuth } = require('../middlewares/auth-middleware')
const {  } = require('../middlewares/validations-middleware')
const {  } = require('../validators/auth')

const router = Router()


router.get('/get-sessions',userAuth, getSessions)
router.post('/add-exercise',userAuth, addExercise)
router.post('/add-session',userAuth, addSession)

module.exports = router
