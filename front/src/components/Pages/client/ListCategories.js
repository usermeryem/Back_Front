import React, {Fragment, useEffect, useState} from 'react'
import axios from 'axios'
import Modal  from 'react-modal'

import {Formik} from 'formik'
import {toast} from 'react-toastify'
import '../../AuthComponents/auth.css'
const ListCategories  = () => {

  let [list, setList]=useState([])
  function getList (){
    axios.get('http://localhost:5000/categorie/listCategories').then((response)=>{
      setList(response.data)
    })
  }
  useEffect(getList, [])
let handleDelete = async (e)=>{
  await axios.delete(`http://localhost:5000/categorie/deleteCategorie/${e}`)
  getList()
}

Modal.setAppElement('*')
const [modalIsOpen, setIsOpen] =useState(false)

function closeModal() {setIsOpen(false);}  

const customStyles = {content: {top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-100%',  transform: 'translate(-50%, -50%)'}}; 

let [tech, setTech]=useState({})
const openModal = async (e) => {setIsOpen(true);
  axios.get(`http://localhost:5000/categorie/getCategorie/${e}`).then((response)=>{
    setTech(response.data)
  })
}  
  return (
<Fragment>
  <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}>
  <div className='container'>        
       <div className='row'>        
        <button className='btn btn-danger col-3 text-light' onClick={closeModal}>Close</button>
       </div>
      <div className='row'>
      <Formik
        initialValues={{nomCategorie: tech.nomCategorie}}
        validate={values => {
          const errors = {};
          if (!values.nomCategorie) {
            errors.nomCategorie = "Titre Obligatoire";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await axios.put(`http://localhost:5000/categorie/updateCategorie/${tech._id}`, values);          
            toast.success(response.data.message)
            closeModal()
            getList()
          } catch (error) {
            toast.error(error.response.data.message)
          }
        }}
      >
     {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting
          /* and other goodies */
        }) => (
          
          <div className="form-box">
            <form onSubmit={handleSubmit} className='form'>
              <h1 className='text-info'>Modifier la catégorie</h1>
              <span className="subtitle">Gestion biblio</span>
              <div className="form-container">
            <input
                  type="text"
                  className={`input ${errors.nomCategorie && touched.nomCategorie && 'border border-danger'} `}
                  name="categorie"
                  placeholder="Nom de Catégorie"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.nomCategorie} />
                {errors.nomCategorie && touched.nomCategorie && <span className='text-danger px-4 py-2'>{errors.nomCategorie}</span>}                
              </div>
              <button type='submit'>Envoyer</button>
            </form>            
          </div>
        )}
      </Formik>
      </div>
   </div>     
  </Modal>
    <div>
    <table className='table table-light table-bordered table-hover '>
      <thead>
        <tr>
          <th scope='col'>Nom de la catégorie</th>
          <th scope='col'>Livres</th>              
          <th scope='col'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {list && list.length>0 ?
        (list.map((categ)=>{
          return(
            <tr key={categ._id}>
              <td>{categ.nomCategorie}</td>
              <td>{categ.listeDesLivres}</td>            
              <td><button onClick={ ()=>{handleDelete(categ._id)}} className='btn btn-danger'>Supprimer</button>
              <button onClick={()=>{openModal(categ._id)}} className='btn btn-success'>Modifier</button>
              </td>
            </tr>
          )
        })):(<tr className='text-center text-danger'><td colSpan='5'>Rien à afficher pour le moment</td></tr>)      
      }
      </tbody>
    </table>
    </div>
    </Fragment>
  )
}
export default ListCategories 