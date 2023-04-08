const categorie = require('../models/categorieModel')
const livre = require('../models/livreModel')
exports.addCategorie= async(req, res)=>{
  try {
    await categorie.create(req.body)
    res.status(200).send({message: "Une catégorie a été ajoutée"})
  } catch (error) {
    res.status(500).send({message: error.message || "Erreur Serveur"})
  }
}
exports.deleteCategorie= async(req, res)=>{
  try {
    await categorie.findByIdAndDelete(req.params.id)
    res.status(200).send({message: "Une catégorie a été supprimé"})
  } catch (error) {
    res.status(500).send({message: error.message || "Erreur Serveur"})
  }
}

exports.updateCategorie= async(req, res)=>{
  try {
    await categorie.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).send({message: "Une catégorie a été mise à jour"})
  } catch (error) {
    res.status(500).send({message: error.message || "Erreur Serveur"})
  }
}
exports.listCategories =async (req, res)=>{
  try {
    const categories= await categorie.find()
    res.status(200).send(categories)
  } catch (error) {
    res.status(500).send({message: error.message || "Erreur Serveur"})
  }
}
exports.getCategorie = async (req, res)=>{
  try {
    const liv= await categorie.findById(req.params.id)
    res.status(200).send(liv)
  } catch (error) {
    res.status(500).send({message: error.message || "Erreur Serveur"})
  }
}
exports.addLivretoCateg=async(req, res)=>{
  try {
    const find=livre.findById(req.params.livreId)
     if (find){
      await categorie.findByIdAndUpdate(req.params.idCategorie, {$push:{listeDesLivres: req.params.livreId}})     
      res.status(200).send({message: "Un livre a été ajouté à cette catégorie"})
     } 
  } catch (error) {
    res.status(500).send({message: 'Erreur Serveur'})
  }
}