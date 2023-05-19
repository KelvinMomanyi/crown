 import React,{createContext, useState, useEffect} from 'react'


const addCartItem=(cartItems,productToAdd)=>{
 

 const existingCartItem = cartItems.find((cartItem)=>{
  return cartItem.id === productToAdd.id
 } 
 )
 

 if(existingCartItem){
   return cartItems.map((cartItem)=>
    cartItem.id === productToAdd.id ?
    {...cartItem, quantity: cartItem.quantity + 1}
    :
    cartItem
 )
 }
 
 return [...cartItems, {...productToAdd, quantity:1}]

} 




const removeCartItem =(cartItems,productToRemove)=>{

  const existingCartItem = cartItems.find((cartItem)=>{
    return cartItem.id === productToRemove.id
   } 
   )
 
  if(existingCartItem.quantity === 1 ){
    
       return cartItems.filter((cartItem)=>cartItem.id !== productToRemove.id)

    
  
   } return cartItems.map((cartItem)=>
     cartItem.id === productToRemove.id ?
   {...cartItem, quantity: cartItem.quantity - 1}
   :
   cartItem
   )


}




const deleteCartItem =(cartItems,productToDelete)=>{
  
       return cartItems.filter((cartItem)=>cartItem.id !== productToDelete.id)
    }



export const CartContext = createContext({
  isCartOpen:false,
  setIsCartOpen:()=>{},
  cartItems:[],
  addItemToCart:()=>{},
  removeItemFromCart:()=>{},
  deleteItemFromCart:()=>{},
  cartCount:0,
  setCartCount:()=>{},
  cartTotalPrice:0,
  totalCartItemPrice:()=>{}
}) 


export const CartProvider=({children})=>{
  const[isCartOpen, setIsCartOpen] = useState(false);
  const[cartItems, setCartItems] = useState([]);
  const[cartCount, setCartCount]=useState(0)
  const[cartTotalPrice, setCartTotalPrice]= useState(0)

  
 useEffect(()=>{
  const newCartCount= cartItems.reduce((total,cartItem)=> total + cartItem.quantity,0)
  setCartCount(newCartCount)
 },[cartItems])

 useEffect(()=>{
  const totalCartPriceCount=cartItems.reduce((total,cartItem)=>total + cartItem.price * cartItem.quantity,0)   
  setCartTotalPrice(totalCartPriceCount)
 },[cartItems])

  const addItemToCart=(productToAdd)=>{
    setCartItems(addCartItem(cartItems,productToAdd))
  }

  const removeItemFromCart=(productToRemove)=>{
    setCartItems(removeCartItem(cartItems,productToRemove))
  }

  const deleteItemFromCart=(productToDelete)=>{
    setCartItems(deleteCartItem(cartItems,productToDelete))
  }


  const value = {isCartOpen, setIsCartOpen, addItemToCart,cartItems, cartCount,setCartCount,removeItemFromCart,deleteItemFromCart, cartTotalPrice}
  
   return(
    <CartContext.Provider value={value}>
        {children}
    </CartContext.Provider>
   )
}




