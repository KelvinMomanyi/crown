import React from 'react'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import Login from '../../components/log-in-form/log-in-form.component';
import './auth.styles.scss'



const Auth=()=>{
  return (
    <div className='authentication-container'>
        <Login />
        <SignUpForm/>
    </div>
  )
}

export default Auth