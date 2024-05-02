import { useEffect, useState, useRef } from "react";
import "./DropFile.scss"

const DropFile = ({ handleUpload }) => {
    const [file, setFile] = useState(null);
	const [imgPreview, setImgPreview] = useState('');
    const [isDragged, setDraged] = useState(false);
    const fileRef = useRef(null);	

    useEffect(() => {
        if(file){
            let url = URL.createObjectURL(file);
            setImgPreview(url);
        }
    }, [file]);
	
	
	const setFileHandler = (e) => {
		let result = null;
        if (e.currentTarget && e.currentTarget.files?.length) {
            e.preventDefault();
            const file = e.target.files[0];
            const reader = new FileReader();
          
            reader.onload = function(event) {
                const base64Image = event.target.result.split(',')[1];
                result = base64Image
            };
        
            reader.readAsDataURL(file); 
			setFile(file);
		}
        handleUpload(result)
    }

    
	useEffect(() => {
	    if (!fileRef.current) return;
		
		fileRef.current.addEventListener('dragenter', handleDragIn)
		fileRef.current.addEventListener('dragleave', handleDragOut)
		fileRef.current.addEventListener('dragover', handleDrag)
		fileRef.current.addEventListener('drop', handleDrop)
		
		return () => {
			if (fileRef.current) {
				fileRef.current.removeEventListener('dragenter', handleDragIn)
				fileRef.current.removeEventListener('dragleave', handleDragOut)
				fileRef.current.removeEventListener('dragover', handleDrag)
				fileRef.current.removeEventListener('drop', handleDrop)
			}
		}
	}, [fileRef]);

	const handleDragIn = (e) => {
		e.preventDefault();
	    e.stopPropagation();
	    setDraged(true);
	}
	
	const handleDragOut = (e) => {
		e.preventDefault();
	    e.stopPropagation();
		setDraged(false);
	}

	const handleDrag = (e) => {
	    e.preventDefault();
	    e.stopPropagation();
	}

	const handleDrop = async (e) => {
	    e.preventDefault();
	    e.stopPropagation();

	    if (e.dataTransfer.files.length > 0) {
			setDraged(false);
	        setFile(e.dataTransfer.files[0]);
	    }
	}

    return (
        <label ref={fileRef} className={"drop_file app-transition" + (isDragged ? " drop_file_dragged" : "")}>
            {
            imgPreview ?
            <>
                <img src={imgPreview}/>
                <button onClick={(e) => {
                    e.preventDefault();
                    setImgPreview('');
                    setFile(null);
                    handleUpload(null);
                }}>
                    remove
                </button>
            </>:
            <></>
            }
            <input className="image_input" type="file" accept="image/*" onChange={setFileHandler}/>
        </label>
    )
}


export default DropFile