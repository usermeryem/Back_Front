import React from 'react'
import f from '../f.jpg'
const Home = () => {
  return (
  <div className='container-fluid ' style={{backgroundImage:`url(${f})`, width:'100%', height:'100%'}}>
    <div className='row bg-special'>
      <h2 className='text-success'><em> Présentation </em></h2>     
      <p>Bienvenu dans votre bibliothèque en ligne</p>    
    </div>     
  </div>
  )
}
export default Home