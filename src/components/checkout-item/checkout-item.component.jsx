import React, { useContext } from 'react'
import './checkout-item.styles.scss'
import { CartContext } from '../../contexts/cart.context'


 const CheckoutItem = ({cartItem}) => {
    const{name, imageUrl, price, quantity}= cartItem
    const {deleteItemFromCart,addItemToCart,removeItemFromCart} =useContext(CartContext)

    const clearCartItemHandler=()=>{
        deleteItemFromCart(cartItem)
    }

    const addItem=()=>addItemToCart(cartItem)
    const remItem=()=>removeItemFromCart(cartItem)

  return (
    <div className='checkout-item-container'>
       <div className="image-container">
          <img src={imageUrl} alt={`${name}`} />
        </div> 
        <span className='name'>{name}</span>
        <span className='quantity'>
          <div className='arrow' onClick={remItem}>&#10094;</div>
             <span className='value'>{quantity}</span>
           <div className='arrow' onClick={addItem}>&#10095;</div>
          </span>
        <span className='price'>${price}</span>
        <div  className="remove-button" onClick={clearCartItemHandler}>&#10005;</div>
    </div>
  )
}


export default CheckoutItem