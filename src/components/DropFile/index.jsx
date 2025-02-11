import { useEffect, useState, useRef } from "react";
import "./DropFile.scss";
import { ReactComponent as DeleteIcon } from "../../assets/svg/delete-icon.svg"
import { ReactComponent as WarningIcon } from "../../assets/svg/warning-icon.svg"
import { ReactComponent as UploadFileIcon } from "../../assets/svg/upload-file-icon.svg"

const DropFile = ({ setValue, value, background=null, drop_file_type, errors, file_types, add_new_errors, clear_errors, handleClick }) => {
	const [file, setFile] = useState(value ?? null);
    const [isDragged, setDraged] = useState(false);
    const fileRef = useRef(null);
	const inputRef = useRef(null);

    const setFileHandler = (e) => {
		const validation = image_validation(e);
		
		if (validation.is_valid) {
			setFile(e.currentTarget.files[0]); 
			clear_errors()
		}
		else{
			add_new_errors(validation.errors)
		}
	}
	
	const image_validation = (e) => {
		const fileType = e.currentTarget.files[0]?.type;
		const fileSize = e.currentTarget.files[0]?.size;
	
		const errors = [];
	
		const isTypeValid = (drop_file_type && drop_file_type.trim() !== "" && new RegExp(drop_file_type).test(fileType)) || !drop_file_type || drop_file_type.trim() === "";
		if (!isTypeValid) {
			errors.push("Incorrect type of file!");
		}
	
		const isSizeValid = fileSize <= 4 * 1024 * 1024;
		if (!isSizeValid) {
			errors.push("Max size of image must be 4 mb!");
		}
	
		return {
			is_valid: isTypeValid && isSizeValid,
			errors: errors
		};
	};
	
	useEffect(() => { 
		if(setValue) {
			setValue(file);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [file]); 

	const get_errors = (arrays) => {
        if (!Array.isArray(arrays)) {
            return <></>; 
        }
        return arrays.map((error, index) => 
			<div className="drop_file_error_message">
				<WarningIcon className='drop_file_error_message_logo'/>
				<p key={index}>{error}</p>
			</div>
		);
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
				// eslint-disable-next-line react-hooks/exhaustive-deps
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
			<div
				ref={fileRef}
				className={`drop_file app-transition${isDragged ? " drop_file_dragged" : ""} ${errors ? "drop_file_incorrect_field" : "" }`}
			>
				{file ? (
					<>
						<img src={URL.createObjectURL(file)} alt="" />
						<div className="remove_image app-transition blurred">
							<p>{file.name}</p>
							<button className="remove_image_button" onClick={(e) => {	
								handleClick();
								e.preventDefault();
								if (inputRef.current) {
									inputRef.current.value = "";
								} 
								setFile(null);
								
								}}>
								<DeleteIcon/>
							</button>
						</div>
					</>
					) :
					<>
					<div className="drop_file_info">
						{background ??
							<>
								<UploadFileIcon className="drop_file_info_upload_icon app-transition"/>
								<p className="drop_file_info_main_text">Выберите файл или перетащите его сюда</p>
								<p className="drop_file_info_help_text">{file_types}</p>
								<div className="drop_file_info_select app-transition">Выбрать</div>
						 	</>
						}
					</div>
					<input
						className={"image_input"}
						type={"file"}
						accept={drop_file_type}
						onChange={setFileHandler}
						ref={inputRef}
						/>
					</>
				}
			</div>
			<div className={`drop_file_error_messages ${get_errors(errors).length > 0 ? "show" : ""}`}>
				{get_errors(errors)}
			</div>
		</>
    );
};

export default DropFile;