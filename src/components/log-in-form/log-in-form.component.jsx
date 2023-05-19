import React, {useState, useContext} from 'react'
import { signInWithGooglePopup,createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils'
import FormInput from '../form-input/form-input.component'
import Button from '../button/button.component'
import './log-in-form.styles.scss'
import { UserContext } from '../../contexts/user.context'


 const defaultFormFields={
  email:'',
  password:''
 }

const Login= () => {
   const[formFields , setFormFields] =useState(defaultFormFields)
   const{email,password}=formFields
   const{setCurrentUser}=useContext(UserContext)
   
   const signInwithGoogle = async () =>{
    const {user} = await signInWithGooglePopup();
   await createUserDocumentFromAuth(user)
 }

   const resetFormFields=()=>{
    setFormFields(defaultFormFields)
  }

  const handleChange= async(event)=>{
     
    const {name , value}= event.target

    setFormFields({...formFields, [name]:value})

  }

  const handleSubmit= async(event)=>{
    event.preventDefault();

    try{
      const {user} =await signInAuthUserWithEmailAndPassword(email, password)
     setCurrentUser(user)
      resetFormFields()
    }catch(error){
      switch(error.code){
        case 'auth/user-not-found':
          alert('User not found')
          break
        case 'auth/wrong-password':
          alert('Wrong Password')
          break;
        default:
          console.log(error)
    
      } 
    }
  }


 
  return (
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with Email and Password</span>
      <form onSubmit={handleSubmit}>
       <FormInput
       label='Email'
       name='email'
       type='email'
       value={email}
       onChange={handleChange}
       required
       />
       <FormInput
         label="Password"
         required
         onChange={handleChange}
         name="password"
         type='password'
        value={password}/>
        
        <div className="buttons-container">
          <Button type='submit' onClick={handleSubmit}>SIGN IN</Button>
          <Button type='button'onClick={signInwithGoogle} buttonType='google'>GOOGLE SIGN IN</Button>
        </div>
       </form>
    </div>
  )
}

export default Login