import { createContext ,useState, useEffect} from "react";
import PRODUCTS from '../shop-data'
import {getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";


export const CategoriesContext = createContext({
   categoryMap:{}
})


export const CategoriesProvider = ({children})=>{
    const [categoriesMap, setCategoriesMap]=useState({})
 
    

  useEffect(()=>{
      const getCategoryMap= async()=>{
      const categoryMap = await getCategoriesAndDocuments()
      console.log(categoryMap)
      setCategoriesMap(categoryMap)
     }
      getCategoryMap()
    },[])
   
    const value={categoriesMap}
  return(
    <CategoriesContext.Provider value={value}>
        {children}
    </CategoriesContext.Provider>
  )
}
















//HOW TO ADD DATA TO FIREBASE ONCE
//import SHOP_DATA from "../shop-data.js";

 // useEffect(()=>{
    //   addCollectionAndDocuments('categories', SHOP_DATA)
    // }, [])