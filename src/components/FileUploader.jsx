import {useState} from "react";
import './FileUploader.css'

export default function FileUploader({setAvatarUrl=null, setFileError=null}) {
    const [file,setFile]=useState(null);
    const [fileUrl,setFileUrl]=useState("");
    console.log("reloading..........");

    const typePattern=/^[a-zA-Z0-9]*(.)(jpg|jpeg|png)$/;

    function handleFileChange(e) {
        console.log("file handling");
        if(e.target.files.length>0) {
            const fileSample=e.target.files[0];
            e.target.value=null;
            handleFileSelected(fileSample);
        }
    }

    function handleRemoveButtonClick(e) {
        e.preventDefault();
        removeUploadFile();
    }

    function removeUploadFile() {
        setFile(null);
        setFileUrl("");
        setAvatarUrl("");
    }
    function handleDrop(ev) {
        console.log("fileDrop");
        ev.preventDefault();
        const fileSample=ev.dataTransfer.items[0].getAsFile();
        handleFileSelected(fileSample);
    }

    const handleDragEnter=(e) => {
        e.stopPropagation();
        e.preventDefault();
    }
    const handleDragOver=(e) => {
        e.stopPropagation();
        e.preventDefault();
    }

    function handleFileSelected(fileSample) {
        if(!typePattern.test(fileSample.type)) {
            console.log("File type is not correct");
            setFileError("File type is not correct! Upload your photo (JPG or PNG, max size: 500KB)!");
            removeUploadFile();
            return;
        }

        if((fileSample.size/1024)>500) {
            console.log("File size is too big!");
            setFileError("File size is too big! Upload your photo (JPG or PNG, max size: 500KB)!");
            removeUploadFile();
            return;
        }

        setFile(fileSample);
        const avatarUrl=URL.createObjectURL(fileSample);
        setFileUrl(avatarUrl);
        setAvatarUrl(avatarUrl);
        setFileError("");
    }
    return(
        <div>
            <label className="input-label" htmlFor="drop-zone">Upload Avatar</label>
            <div className="drop-zone" onDrop={handleDrop} onDragEnter={handleDragEnter} onDragOver={handleDragOver}>
                {!file&&(
                    <>
                        <label className="image-upload-label" htmlFor="image-upload"><img src="icon-upload.svg" alt="upload icon" /></label>
                        <p>Drop and drag or click to upload</p>
                    </>
                )}

                {file&&(
                    <>
                        <img src={fileUrl} alt="avatar image" />
                        <div>
                            <button className="remove-img-btn" onClick={handleRemoveButtonClick}>Remove image</button>
                            <label htmlFor="image-upload" className="change-img-label">Change image</label>
                        </div>
                    </>
                )}
            </div>

            <input type="file"
                onChange={handleFileChange}
                className="input-file"
                id="image-upload"
                name="image-upload"
                accept=".jpg, .png" />
        </div>
    )
};