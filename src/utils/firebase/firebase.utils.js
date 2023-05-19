import {initializeApp} from 'firebase/app'
import { getAuth, signInWithPopup,signInWithRedirect, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {getFirestore, doc, getDoc, setDoc, collection, writeBatch,query, getDocs} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDffzPqOr1JWiy-3gmsbEZYA18-cXLuceE",
    authDomain: "crwn-clothing-db-350d6.firebaseapp.com",
    projectId: "crwn-clothing-db-350d6",
    storageBucket: "crwn-clothing-db-350d6.appspot.com",
    messagingSenderId: "319307728231",
    appId: "1:319307728231:web:5521b120fc1b1175f7dbc2"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt:'select_account'
  })


  export const auth=getAuth();

  export const signInWithGooglePopup=()=> signInWithPopup(auth, googleProvider)
  export const signInWithGoogleRedirect=()=> signInWithRedirect(auth, googleProvider)




  export const db= getFirestore();

  export const createUserDocumentFromAuth = async(userAuth, additionalInformation={})=>{
    if(!userAuth) return;
    const UserDocRef = doc(db, 'users', userAuth.uid )

   
    
    const UserDocSnapshot = await getDoc(UserDocRef)
  

     if(!UserDocSnapshot.exists()){
        const {displayName, email, photoURL} = userAuth
        const createdAt = new Date()
         try{
           await setDoc(UserDocRef, {
            displayName,
            email,
            createdAt,
            ...additionalInformation
           })
         }catch(error){
                console.log('error creating the user', error.message)
         }
     }
    return UserDocRef
  }


  export const createAuthUserWithEmailAndPassword = async (email, password)=>{
     if(!email || !password) return;
   
    return await createUserWithEmailAndPassword(auth, email, password)

  }

  export const signInAuthUserWithEmailAndPassword = async (email, password)=>{
    if(!email || !password) return;
  
   return await signInWithEmailAndPassword(auth, email, password)

 }



export const signOutUser=async () => await signOut(auth)



//DATABASE

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef= collection(db,collectionKey)
   const batch = writeBatch(db)
    
   objectsToAdd.forEach((object)=>{
    const docRef=doc(collectionRef, object.title.toLowerCase())
    batch.set(docRef, object)
   })


   await batch.commit()
   console.log('done')
}


export const getCategoriesAndDocuments = async ()=>{
   const collectionRef= collection(db, 'categories')
   const q = query(collectionRef)
  
   const querySnapshot = await getDocs(q)
  
   const categoryMap= querySnapshot.docs.reduce((acc, docSnapShot)=>{
     const {title,items }= docSnapShot.data()
      acc[title.toLowerCase()] = items
      return acc
   },{})
   return categoryMap
}

