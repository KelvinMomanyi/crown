import { useState, useContext } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"
import FormInput from "../form-input/form-input.component"
import './sign-up-form.styles.scss'
import Button from '../button/button.component'
import { UserContext } from "../../contexts/user.context"


const defaultFormFields={
  displayName:'',
  email:'',
  password:'',
  confirmPassword:''
}

const SignUpForm=()=>{
  const [formFields, setFormFields]=useState(defaultFormFields)
  const {displayName, email, password, confirmPassword}=formFields

  const{setCurrentUser}=useContext(UserContext)

  console.log(formFields);

  const resetFormFields=()=>{
    setFormFields(defaultFormFields)
  }

  const handleSubmit= async(event)=>{
    event.preventDefault();
    if(password !== confirmPassword){
      alert('Passwords do not match')
      return;
    }
    
   try{
     const {user}= await createAuthUserWithEmailAndPassword(email, password)
     await createUserDocumentFromAuth(user, {displayName});
     setCurrentUser(user)
     resetFormFields();
     }
     catch(error){
      if(error.code === 'auth/email-already-in-use'){
        alert('Cannot create User, email already in use')
      }else{
        console.log('error encountered',error)
      }
        
   }

  }

  const handleChange=(event)=>{
    const {name, value} = event.target;
    
    setFormFields({...formFields, [name]: value})
   
  }

    return(
       <div className="sign-up-container">
        <h2>Don't have an Account?</h2>
         <span>Sign Up with Email and Password</span>
         <form onSubmit={handleSubmit}>
             <FormInput
                label='Display Name'
                name='displayName'
                value={displayName}
                onChange={handleChange}
                type='text'
                required

             />
             <FormInput
                label='Email'
                name='email'
                value={email}
                onChange={handleChange}
                type='email'
                required
                          
                 
                
             />
              <FormInput
             label="Password"
             type='password'
             required
             onChange={handleChange}
              name="password"
               value={password}
          /> 
              <FormInput
               label='Confirm Password'
               type='password'
                required
                onChange={handleChange} 
                name="confirmPassword" 
               value={confirmPassword}
             
          />
         
            
            

            <Button type='submit'>Sign Up</Button>     
         </form>
       </div>
    )
}

export default SignUpForm