import { useEffect, useState, useRef } from "react";
import "./DropFile.scss";

const DropFile = ({ setValue, value }) => {
	const [file, setFile] = useState(value ?? null);
    const [isDragged, setDraged] = useState(false);
    const fileRef = useRef(null);

    const setFileHandler = (e) => { 
		if (e.currentTarget && e.currentTarget.files?.length) { 
			setFile(e.currentTarget.files[0]); 
		} 
	}

	useEffect(() => { 
		if(setValue) {
			setValue(file);
		}
	}, [file]); 

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
        <label
            ref={fileRef}
            className={`drop_file app-transition${isDragged ? " drop_file_dragged" : ""}`}
        >
            {file ? (
                <>
                    <img src={URL.createObjectURL(file)} alt="Preview" />
                    <button onClick={(e) => {
						e.preventDefault(); 
						setFile(null);
						}}>Remove</button>
                </>
            ) : <></>
			}
            <input
                className="image_input"
                type="file"
                accept="image/*"
                onChange={setFileHandler}
            />
        </label>
    );
};

export default DropFile;