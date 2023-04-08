import React, {Fragment, useEffect, useState} from 'react'
import axios from 'axios'
import Modal  from 'react-modal'

import {Formik} from 'formik'
import {toast} from 'react-toastify'
import '../../AuthComponents/auth.css'
const ListLivres = () => {

  let [list, setList]=useState([])
  function getList (){
    axios.get('http://localhost:5000/livre/listLivres').then((response)=>{
      setList(response.data)
    })
  }
  useEffect(getList, [])
let handleDelete = async (e)=>{
  await axios.delete(`http://localhost:5000/livre/deleteLivre/${e}`)
  getList()
}

Modal.setAppElement('*')
const [modalIsOpen, setIsOpen] =useState(false)

function closeModal() {setIsOpen(false);}  

const customStyles = {content: {top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-100%',  transform: 'translate(-50%, -50%)'}}; 

let [tech, setTech]=useState({})
const openModal = async (e) => {setIsOpen(true);
  axios.get(`http://localhost:5000/livre/getLivre/${e}`).then((response)=>{
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
        initialValues={{title: tech.title, author: tech.author, description: tech.description, attach: tech.attach}}
        validate={values => {
          const errors = {};
          if (!values.title) {
            errors.title = "Titre Obligatoire";
          }
          if (!values.author) {
            errors.author = 'Auteur Obligatoire';
          }          
          if (!values.description) {
            errors.description = 'Description obligatoire';
          } 
          if (!values.attach) {
            errors.attach = "Fichier obligatoire";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await axios.put(`http://localhost:5000/livre/updateLivre/${tech._id}`, values);          
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
              <h1 className='text-info'>Modifier les données du livre</h1>
              <span className="subtitle">Gestion biblio</span>
              <div className="form-container">
            <input
                  type="text"
                  className={`input ${errors.title && touched.title && 'border border-danger'} `}
                  name="titre"
                  placeholder="Titre"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title} />
                {errors.title && touched.title && <span className='text-danger px-4 py-2'>{errors.title}</span>}

                <input
                  type="text"
                  className={`input ${errors.author && touched.author && 'border border-danger'} `}
                  name="author"
                  placeholder="Auteur"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.author} />
                {errors.author && touched.author && <span className='text-danger px-4 py-2'>{errors.author}</span>}    

                <input
                  type="text"
                  className={`input ${errors.description && touched.description && 'border border-danger'} `}
                  name="description"
                  placeholder="Description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description} />
                {errors.description && touched.description && <span className='text-danger px-4 py-2'>{errors.description}</span>}

                <input
                  type="text"
                  className={`input ${errors.attach && touched.attach && 'border border-danger'} `}
                  name="attach"
                  placeholder="Fichier"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.attach} />
                {errors.attach && touched.attach && <span className='text-danger px-4 py-2'>{errors.attach}</span>}

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
          <th scope='col'>Titre</th>
          <th scope='col'>Auteur</th>
          <th scope='col'>Description</th>
          <th scope='col'>Fichier</th>         
          <th scope='col'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {list && list.length>0 ?
        (list.map((livr)=>{
          return(
            <tr key={livr._id}>
              <td>{livr.title}</td>
              <td>{livr.author}</td>              
              <td>{livr.description}</td>
              <td>{livr.attach}</td>
              <td><button onClick={ ()=>{handleDelete(livr._id)}} className='btn btn-danger'>Supprimer</button>
              <button onClick={()=>{openModal(livr._id)}} className='btn btn-success'>Modifier</button>
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
export default ListLivres