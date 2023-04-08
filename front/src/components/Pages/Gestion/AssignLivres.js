import React from 'react'
import '../../AuthComponents/auth.css'
import axios from 'axios';
import { Formik } from 'formik';
import {useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const AssignLivres = () => {
  const navigate = useNavigate() 
  return (
    <div className='d-flex w-60 mx-auto flex-column align-items-center mt-4'>     
       <Formik
        initialValues={{catgId: null, livreId:null}}
        validate={async(values) =>  {
          const cate= await axios.get(`http://localhost:5000/categorie/getCategorie/${values.catgId}`)
          const livr= await axios.get(`http://localhost:5000/livre/getLivre/${values.livreId}`)
          const errors = {};
          if (!values.catgId) {
            errors.catgId = "Quel est l'Id de la catégorie?";
          }
           if(!cate){
            errors.catgId ="Vérifier l'id de catégorie"
          }
          if (!values.livreId) {
            errors.livreId= "Quel est l'Id du livre?";
          } 
          if (!livr){
            errors.livreId="Vérifier l'id du livre"
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {            
            const response = await axios.put(`http://localhost:5000/categorie/addLivreToCateg/${values.catgId}/${values.livreId}`)
            navigate('/')
            toast.success(response.data.message)
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
              <h1 className='text-info'>Ajouter un livre à une catégorie</h1>
              <span className="subtitle">Gestion de bibliothèque</span>
              <div className="form-container">
            <input
                  type="number"
                  className={`input ${errors.catgId  && touched.catgId && 'border border-danger'} `}
                  name="catgId"
                  placeholder="Id de Catégorie"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.catgId} />
                {errors.catgId  && touched.catgId  && <span className='text-danger px-4 py-2'>{errors.catgId }</span>}
                <input
                  type="number"
                  className={`input ${errors.livreId && touched.livreId && 'border border-danger'} `}
                  name="livreId"
                  placeholder="livreId"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.livreId} />
                {errors.livreId && touched.livreId && <span className='text-danger px-4 py-2'>{errors.livreId}</span>}
                   </div>
              <button type='submit'>Envoyer</button>
            </form>            
          </div>
        )}
      </Formik>
    </div>
  )
}

export default AssignLivres