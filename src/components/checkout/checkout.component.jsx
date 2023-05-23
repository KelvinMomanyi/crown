import React from 'react'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import CartItem from '../cart-item/cart-item.component'
import { ProductsContext } from '../../contexts/categories.context'
import './checkout.styles.scss'
import CheckoutItem from '../checkout-item/checkout-item.component'
import PaymentForm from '../payment-form/payment-form.component'



 const Checkout = () => {
   const {cartCount, setCartCount}  = useContext(CartContext)
   const {cartItems,cartTotalPrice}=useContext(CartContext)

  
  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
         <div className='header-block'>
           <span>Product</span>
         </div>
         <div className='header-block'>
           <span>Description</span>
         </div>
         <div className='header-block'>
           <span>Quantity</span>
         </div>
         <div className='header-block'>
           <span>Price</span>
         </div>
         <div className='header-block'>
           <span >Remove</span>
         </div>
         
      </div>
      {
        cartItems.map((cartItem)=>(
           <CheckoutItem key={cartItem.id}  cartItem={cartItem}/>
       
           )
          
      )}        
             
    <span className='total'>Total:${cartTotalPrice}</span>
      <PaymentForm/>  
    </div>
  )
}


export default Checkout