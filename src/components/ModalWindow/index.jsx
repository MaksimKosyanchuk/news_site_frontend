import { useEffect, useState } from "react";
import { useLocation } from 'react-router'
import "./ModalWindow.scss"

const ModalWindow = ({ modalWindow, showModalWindow }) => {
    const [ isVisible, setIsVisible ] = useState(false)
    let location = useLocation()

    useEffect(() => {
        close_modal_window()
    },[location])

    const close_modal_window = () => {
        document.body.classList.remove("no-scroll");
        setIsVisible(false)
        showModalWindow(false)
    }

    const open_modal_window = () => {
        document.body.classList.add("no-scroll");
        setIsVisible(true)
    }

    useEffect(() => {
        if(modalWindow) {
            open_modal_window()
        }
        else {
            close_modal_window()
        }
    }, [modalWindow])
    
    return (
       <div className={`modal_window ${isVisible ? 'visible' : ''}`} >
            <button onClick={ () => { close_modal_window() }} className="modal_window_background"/>
            <div className="modal_window_body blurred">
                <div className="modal_window_body_title">
                    <p>{modalWindow?.title ?? ""}</p>
                </div>
                <div className="modal_window_body_content">
                    {modalWindow?.content ?? <></>}
                </div>
            </div>
       </div>
    )
}

export default ModalWindow;