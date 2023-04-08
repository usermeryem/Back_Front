const express= require('express')
const {addLivre, deleteLivre, updateLivre, listLivres, getLivre}= require('../controllers/livreController')
const router=express.Router()
const upload=require('../middleware/upload')

router.post('/addLivre', upload.single('attach'), addLivre)
router.delete('/deleteLivre/:id', deleteLivre)
router.put('/updateLivre/:id', updateLivre)
router.get('/listLivres', listLivres)
router.get('/getLivre/:id', getLivre)
module.exports=router