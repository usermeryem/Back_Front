const express= require('express')
const morgan=require('morgan')
const cors=require('cors')
const bodyParser=require('body-parser')
require('dotenv').config()
const passport= require('passport')
const app=express()

require('./DB/connect')
require('./Passport-strategies/bearer')
app.use(cors())
app.use(morgan('combined'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', require('./routes/userRoute'))
app.use('/categorie', require('./routes/categorieRoute'))
app.use('/livre', require('./routes/livreRoute'))
const port=process.env.port || 5000
app.listen(port, ()=>{console.log(`App is listening on port ${port}`);} )