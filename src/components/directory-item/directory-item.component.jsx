import './directory-item.styles.scss'


const DirectoryItem=({category})=>{
  const {imageUrl,title}= category;
  return(
    <div className='directory-container' style={{backgroundImage: `URL(${imageUrl})`, borderRadius:8}}> 
         <div className='body'   >
            <h2>{title}</h2>
            <p>Shop Now</p>
          </div>
       </div>  
  )
}

export default DirectoryItem