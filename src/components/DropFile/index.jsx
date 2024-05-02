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
		try{
			e.preventDefault();
			const newFile = e.target.files[0];
			const reader = new FileReader();
			reader.onload = function(e) {
				handleUpload(e?.target?.result?.split(',')[1])
			};
			setFile(newFile);	
			reader.readAsDataURL(newFile); 	
		}
		catch(e){
			console.log(e)
		}
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