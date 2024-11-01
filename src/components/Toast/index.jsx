import { useEffect } from "react";
import "./Toast.scss"

const Toast = ({ toast, showToast }) => {
    useEffect(() => {
        if(toast) {
            setTimeout(() => 
            {
                showToast(false)
            } , 3000)
        }
    }, [ toast ])

    return (
        <div className={ "app-transition toast " + (toast ? "toast_active" : "") }>
            <p>{toast.message}</p>
        </div>
    )
}

export default Toast;
