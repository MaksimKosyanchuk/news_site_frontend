import { useEffect, useState, useRef } from "react";
import "./DropFile.scss";

const DropFile = ({ setValue, value, drop_file_type, errors, handleClick }) => {
	const [file, setFile] = useState(value ?? null);
    const [isDragged, setDraged] = useState(false);
    const fileRef = useRef(null);
	const inputRef = useRef(null);

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

	const get_errors = (arrays) => {
		console.log(arrays)
        if (!Array.isArray(arrays)) {
            return <></>; 
        }

        return arrays.map((error, index) => <p key={index}>{error}</p>);
    };

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
		<>
			<label
				ref={fileRef}
				className={`drop_file app-transition${isDragged ? " drop_file_dragged" : ""} ${errors ? "drop_file_incorrect_field" : "" }`}
				>
				{file ? (
					<>
						<img src={URL.createObjectURL(file)} alt="" />
						<button onClick={(e) => {
							e.preventDefault(); 
							setFile(null);
							if (inputRef.current) {
								inputRef.current.value = "";
							}
							handleClick();
						}}>Remove</button>
					</>
				) : <></>
			}
				<input
					className={"image_input"}
					type="file"
					accept={drop_file_type}
					onChange={setFileHandler}
					ref={inputRef}
					/>
			</label>
			<div className="drop_file_incorrect_messages">
				{
					get_errors(errors)
				}
			</div>
		</>
    );
};

export default DropFile;