const mongoose= require('mongoose')
const Schema=mongoose.Schema
const livreSchema= new Schema({  
  title: {type: String, required:[true, 'Titre obligatoire'] },
  author:{type: String, required:[true, 'Auteur obligatoire']},
  description: {type: String, required:[true, 'Décrivez le livre brièvement']},   
  attach: {type: String}
}, {timestamps: true, versionKey: false} )
const livre=mongoose.model('livre', livreSchema)
module.exports=livre