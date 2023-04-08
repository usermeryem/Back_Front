const User=require('../models/userModel')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

exports.register = async(req, res)=>{
  try {
    const find= await User.findOne({email: req.body.email})
    if (find){
      res.status(400).send({message: 'Utilisateur déjà enregistré'})
    } else {
      const salt = await bcrypt.genSaltSync(10)
      req.body.password =await bcrypt.hashSync(req.body.password, salt)
       await User.create(req.body)
      res.status(201).send({message: 'Nouveau Utilisateur ajouté'})
    }
  } catch (error) {
    res.status(500).send({message: error.message || 'Erreur serveur'})
  }
}
exports.login = async (req, res)=>{
try {
  const find = await User.findOne({email: req.body.email})
  if(find && bcrypt.compareSync(req.body.password, find.password)){
    const data = {email: find.email, id: find._id}
    const token = jwt.sign(data, process.env.secret_jwt, {expiresIn: '1d'})
    res.status(200).send({message: 'Vous êtes bien connectés', token})
  }else {
    res.status(400).send({message: 'Vérifier Email ou Mot de Passe'})
  }
} catch (error) {
  res.status(500).send({message: error.message || 'Erreur Serveur'})
}
}