const mongoose= require('mongoose')
const Schema=mongoose.Schema
const categorieSchema= new Schema({  
  nomCategorie: {type: String, required:[true, 'Nom de la catégorie obligatoire']}, 
  listeDesLivres: [{type: Schema.Types.ObjectId, ref: "livre"}]
})  
const categorie=mongoose.model('categorie', categorieSchema)
module.exports=categorie