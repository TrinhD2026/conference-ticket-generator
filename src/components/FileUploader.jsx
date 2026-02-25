import {useState} from "react";
import './FileUploader.css'

let UploadStatus='idle'|'uploading'|'success'|'error';
export default function FileUploader() {
    const [file,setFile]=useState(null);
    const [fileUrl,setFileUrl]=useState("");
    console.log("reloading..........");

    const typePattern=/.*(jpg|jpeg|png)$/;
    function handleFileChange(e) {
        console.log("file handling");
        if(e.target.files.length>0) {
            const fileSample=e.target.files[0];
            e.target.value=null;

            if(!typePattern.test(fileSample.type)) {
                console.log("file type is not correct");
                removeUploadFile();
                return;
            }

            if((fileSample.size/1024)>500) {
                console.log("file size is too big!");
                removeUploadFile();
                return;
            }

            setFile(fileSample);
            setFileUrl(URL.createObjectURL(fileSample));
        }
    }

    function handleRemoveButtonClick(e) {
        e.preventDefault();
        removeUploadFile();
    }

    function removeUploadFile() {
        setFile(null);
        setFileUrl("");
    }
    return(
        <div>
            <div className="drop-zone">
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