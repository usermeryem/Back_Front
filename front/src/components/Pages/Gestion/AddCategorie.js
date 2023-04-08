import React from 'react'
import '../../AuthComponents/auth.css'
import axios from 'axios';
import { Formik } from 'formik';
import {useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const AddCategorie = () => {
  const navigate = useNavigate() 
  return (
    <div className='d-flex w-50 mx-auto flex-column align-items-center mt-4'>  
     <Formik
        initialValues={{nomCategorie: ''}}
        validate={values => {
          const errors = {};
          if (!values.nomCategorie) {
            errors.nomCategorie = 'Le nom de la catégorie est obligatoire';
          }          
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await axios.post('http://localhost:5000/categorie/addCategorie', values)
            navigate('/')
            toast.success(response.data.message)
          } catch (error) {
            toast.error(error.response.data.message)
          }}}>

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
             <h1 className='text-info'>Ajouter une catégorie</h1>
              <span className="subtitle">Gestion de bibliothèque</span>
               <div className="form-container">
            <input
                  type="text"
                  className={`input ${errors.nomCategorie && touched.nomCategorie && 'border border-danger'} `}
                  name="nom"
                  placeholder="Nom de catégorie"
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
  )
}
export default AddCategorie