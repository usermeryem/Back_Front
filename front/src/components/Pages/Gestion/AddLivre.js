import React from 'react'
import '../../AuthComponents/auth.css'
import axios from 'axios';
import { Formik } from 'formik';
import {useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddLivre = () => {
  const navigate = useNavigate() 
  return (
    <div className='d-flex w-60 mx-auto flex-column align-items-center mt-4'>     
       <Formik
        initialValues={{title: '', author:'', description:'', attach:''}}
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
            errors.attach = "pdf obligatoire";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await axios.post('http://localhost:5000/livre/addLivre', values)
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
              <h1 className='text-info'>Ajouter Un Livre</h1>
              <span className="subtitle">Gestion de bibliothèque</span>
              <div className="form-container">
            <input
                  type="text"
                  className={`input ${errors.title && touched.title && 'border border-danger'} `}
                  name="title"
                  placeholder="Titre"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title} />
                {errors.title && touched.title && <span className='text-danger px-4 py-2'>{errors.title}</span>}
                <input
                  type="text"
                  className={`input ${errors.author && touched.author && 'border border-danger'} `}
                  name="Auteur"
                  placeholder="Auteur"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.author} />
                {errors.author && touched.author && <span className='text-danger px-4 py-2'>{errors.author}</span>}

                <input
                  type="text"
                  className={`input ${errors.description && touched.description && 'border border-danger'} `}
                  name="description"
                  placeholder="Description du livre"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description} />
                {errors.description && touched.description && <span className='text-danger px-4 py-2'>{errors.description}</span>}


                <input
                  type="file"
                  className={`input ${errors.attach && touched.attach && 'border border-danger'} `}
                  name="fichier"
                  placeholder="pdf"
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
  )
}

 export default AddLivre