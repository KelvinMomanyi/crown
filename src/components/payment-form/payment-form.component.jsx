import React,{useContext, useState} from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import Button,{BUTTON_TYPE_CLASSES} from '../button/button.component'
import './payment-form.styles.scss'
import { CartContext } from '../../contexts/cart.context'
import { UserContext } from '../../contexts/user.context'



const PaymentForm = () => {
  const stripe = useStripe()
  const elements = useElements()
  const {cartTotalPrice}=useContext(CartContext)
  const {currentUser}=useContext(UserContext)
  const [isProcessingPayment, setisProcessingPayment]=useState(false)
  const amount = cartTotalPrice


  const paymentHandler= async(e)=>{
    e.preventDefault();

    if(!stripe || !elements){
      return
    }

    setisProcessingPayment(true)


    const response= await fetch('/.netlify/functions/create-payment-intent', {
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({amount : amount * 100})
    }).then(res=>res.json())
    
    const {paymentIntent:{client_secret}}= response



   const paymentResult = await stripe.confirmCardPayment(client_secret, {
    payment_method: {
      card: elements.getElement(CardElement),
      billing_details: {
        name: currentUser ? currentUser.displayName : 'Guest',
    }
    }
   })

   setisProcessingPayment(false)

   if(paymentResult.error){
    alert(paymentResult.error)
   }else{
    if(paymentResult.paymentIntent.status === 'succeeded'){
      alert('Payment Successful')
    }
   }

  }
  return (
    <div className='payment-form-container'>
      <form onSubmit={paymentHandler} className='payform-container'>
        <h2>Credit Card Payment</h2>
        <CardElement/>
         <Button 
         disabled={isProcessingPayment}
         buttonType='inverted'>Pay now</Button> 
      </form>
    </div>
  )
}

export default PaymentForm;


