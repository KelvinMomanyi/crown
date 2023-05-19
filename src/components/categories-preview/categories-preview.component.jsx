import React, { Fragment, useContext } from 'react'
import ProductCard from '../../components/productCard/product-card.component'
import { CategoriesContext } from '../../contexts/categories.context'
import CategoryPreview from '../../components/category-preview/category-preview.component'
import '../../components/categories-preview/categories-preview.component'


 const CategoriesPreview = () => {
   const {categoriesMap} = useContext(CategoriesContext)
  
  return(
 
   <div className='shop-container'>  
      {
        Object.keys(categoriesMap).map((key)=>{
           const products= categoriesMap[key];
             return (
               <CategoryPreview  key={key} title={key} products={products}/>
               
               )   
            
             })}
    </div>
  
  )

}
 export default CategoriesPreview;