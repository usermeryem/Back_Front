const livre= require("../models/livreModel")

exports.addLivre= async(req, res)=>{  
    try {
      let livr=new livre({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description
      })
      if (req.file){livr.attach=req.file.path}
     await livr.save()
     res.status(200).send({message: "Un livre a été ajouté"})
   } catch (error) {
     res.status(500).send({message: error.message || "Erreur Serveur"})
   }
 } 

exports.deleteLivre= async(req, res)=>{
  try {
    await livre.findByIdAndDelete(req.params.id)
    res.status(200).send({message: "Un livre a été supprimé"})
  } catch (error) {
    res.status(500).send({message: error.message || "Erreur Serveur"})
  }
}

exports.updateLivre= async(req, res)=>{
  try {
    await livre.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).send({message: "Un livre a été mis à jour"})
  } catch (error) {
    res.status(500).send({message: error.message || "Erreur Serveur"})
  }
}
exports.listLivres =async (req, res)=>{
  try {
    const livres= await livre.find()
    res.status(200).send(livres)
  } catch (error) {
    res.status(500).send({message: error.message || "Erreur Serveur"})
  }
}
exports.getLivre = async (req, res)=>{
  try {
    const liv= await livre.findById(req.params.id)
    res.status(200).send(liv)
  } catch (error) {
    res.status(500).send({message: error.message || "Erreur Serveur"})
  }
}