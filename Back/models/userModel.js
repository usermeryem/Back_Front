const mongoose= require('mongoose')
const Schema=mongoose.Schema
const userSchema= new Schema({
  name: {type: String, required:[true, 'Nom est obligatoire']},
  firstName: {type: String, required: [true, 'Prénom est obligatoire']},
  email: {type: String, required: [true, 'Email est obligatoire']},
  password: {type: String, required:[true, 'Mot de Passe obligatoire']},
  type: {type: String, required: [true, "Admin ou Client Normal ou Client Abonné?"]}  
}, {timestamps: true, versionKey: false} )
const User=mongoose.model('user', userSchema)
module.exports=User