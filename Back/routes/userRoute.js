const express=require('express')
const passport = require('passport')

const { register, login } = require('../controllers/userController')


const router=express.Router()

router.post('/register', register)
router.post('/login', login)

router.get('/logged', 
passport.authenticate('bearer', {session:false}),
function(req, res){
  res.json(req.user)
}
)


module.exports=router