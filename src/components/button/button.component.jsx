
import './button.styles.scss'
const BUTTON_TYPE_CLASSES={
   google:'google-sign-in',
   inverted:'inverted'
}


const Button=({children,buttonType, disabled, ...otherProps})=>{
    return(
        <button  disabled={disabled}  className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
            {children}
        </button>
    )
}

export default Button