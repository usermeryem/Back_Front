import './auth.css'
import axios from 'axios';
import { Formik } from 'formik';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
const Register = () => {
  const navigate = useNavigate()
  
  return (
    <div className='d-flex w-50 mx-auto flex-column align-items-center mt-4'>
      <Link className="btn btn-primary" to='/' >
        <FontAwesomeIcon color='white' icon={faHome} />  Accueil
      </Link>
      <Formik
        initialValues={{ name: '', firstName: '', email: '', password: '', type: '' }}
        validate={values => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Le nom est obligatoire';
          }
          if (!values.firstName) {
            errors.firstName = 'Le prénom est obligatoire';
          }
          if (!values.email) {
            errors.email = 'Email est obligatoire';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Adresse Email pas valide';
          }        
          if (!values.password) {
            errors.password = 'Mot de passe obligatoire';
          }
          if (!values.type) {
            errors.type = 'Type obligatoire';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await axios.post('http://localhost:5000/user/register', values)
            navigate('/login')
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
              <h1 className='text-info'>S'enregistrer</h1>
              <span className="subtitle">Créer votre compte gratuitement avec votre email</span>
              <div className="form-container">
                <input
                  type="text"
                  className={`input ${errors.name && touched.name && 'border border-danger'} `}
                  name="name"
                  placeholder="Nom"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name} />
                {errors.name && touched.name && <span className='text-danger px-4 py-2'>{errors.name}</span>}
                <input
                  type="text"
                  className={`input ${errors.firstName && touched.firstName && 'border border-danger'} `}
                  name="firstName"
                  placeholder="Prénom"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName} />
                {errors.firstName && touched.firstName && <span className='text-danger px-4 py-2'>{errors.firstName}</span>}

                <input
                  type="email"
                  className={`input ${errors.email && touched.email && 'border border-danger'} `}
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email} />
                {errors.email && touched.email && <span className='text-danger px-4 py-2'>{errors.email}</span>}
                <input
                  type="password"
                  name="password"
                  className={`input ${errors.password && touched.password && 'border border-danger'} `}
                  placeholder="Mot de Passe"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password} />
                {errors.password && touched.password && <span className='text-danger  px-4 py-2'> {errors.password}</span>}

                <select
                  type="text"
                  name="type"
                  className={`${'form-select'} input ${errors.type && touched.type && 'border border-danger'}`}
                  aria-label="Default"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.role}>
                  <option selected>Sélectionner le rôle</option>
                  <option value={"Admin"}>Admin</option>
                  <option value={"Client Normal"}>Client Normal</option>
                  <option value={"Client Abonné"}>Client Abonné</option>
                </select>
                {errors.type && touched.type && <span className='text-danger  px-4 py-2'> {errors.type}</span>}
              </div>
              <button type='submit'>S'enregistrer</button>
            </form>
            <div className="form-section">
              <p>Déja inscrit? <Link className='text-primary' to="/login">S'identifier</Link></p>
            </div>
          </div>
        )}
      </Formik>
    </div>
  )
}
export default Register