const { registerUser, loginUser, allUsers } = require("../controller/userController")

const router = require("express").Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/allusers', allUsers)

module.exports = router