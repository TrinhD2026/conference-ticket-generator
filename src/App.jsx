import {useState,useRef} from 'react';
import './App.css';
import FileUploader from './components/FileUploader';

function App() {
    const [filePath,setFilePath]=useState("");
    const [fullname,setFullname]=useState("");
    const [email,setEmail]=useState("");
    const [gitName,setGitName]=useState("");
    const [fileNote,setFileNote]=useState("Upload your photo (JPG or PNG, max size: 500KB).");
    const [fileError,setFileError]=useState("");
    const [nameError,setNameError]=useState("");
    const [emailError,setEmailError]=useState("");
    const [gitNameError,setGitNameError]=useState("");

    const generateBtn=useRef(null);

    function validateForm() {
        let results={
            "filePath":false,
            "firstName": false,
            "email": false,
            "gitName": false,
        };
        setFileNote("");
        if(!filePath.trim()) {
            setFileError("Please select your avatar");
        }
        else {
            setFileError("");
        }

        if(!fullname.trim()) {
            setNameError("Please enter your full name");
        }
        else {
            setNameError("");
        }

        if(!email.trim()) {
            setEmailError("Please enter a valid email");
        }
        else {
            setEmailError("");
        }

        if(!gitName.trim()) {
            setGitNameError("Please enter your git username");
        }
        else {
            setGitNameError("");
        }

        return results;
    }

    function isValid(objs) {

        for(const property in objs) {
            let isValid=objs[property];
            if(!isValid)
                return false;
        }

        return true;
    }

    function handleGenerateTicket(e) {
        e.preventDefault();
        generateBtn.current.blur();
        if(!isValid(validateForm())) {
            return;
        }

    }

    return (
        <>
            <div className="header">
                <img src="/logo-full.svg" alt="logo" />
                <h1>Your Journey to Coding Conf 2025 Starts Here!</h1>
                <p>Secure your spot at next year's biggest coding conference.</p>
            </div>
            <form>
                <label className="input-label" htmlFor="drop-zone">Upload Avatar</label>
                {/*<label className="drop-zone">*/}
                {/*    Drop and drag or click to upload*/}
                {/*    <input type="file"*/}
                {/*        className="input-file"*/}
                {/*        id="image_upload"*/}
                {/*        name="image_upload"*/}
                {/*        accept=".jpg, .png" />*/}
                {/*    <img src="icon-upload.svg" alt="upload icon"/>*/}
                {/*</label>*/}
                <FileUploader/>
                {
                    fileNote!==""&&
                    <div className="input-note">
                        <img src="/icon-info.svg" alt="info icon" />
                        <p>{fileNote}</p>
                    </div>
                }
                {
                    fileError!==""&&
                    <div className="input-note">
                        <img className="error-logo" src="/icon-info.svg" alt="info icon" />
                        <p className="error-text">{fileError}</p>
                    </div>
                }

                <label className="input-label" htmlFor="input__full-name">Full Name</label>
                <input type="text" className={nameError? `text-input text-input__error`:"text-input"} id="input__full-name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)} />
                {
                    nameError!==""&&
                    <div className="input-note">
                        <img className="error-logo" src="/icon-info.svg" alt="info icon" />
                        <p className="error-text">{nameError}</p>
                    </div>
                }

                <label className="input-label" htmlFor="input__email">Email Address</label>
                <input type="email" className={emailError? `text-input text-input__error`:"text-input"} id="input__email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                {
                    emailError!==""&&
                    <div className="input-note">
                        <img className="error-logo" src="/icon-info.svg" alt="info icon" />
                        <p className="error-text">{emailError}</p>
                    </div>
                }

                <label className="input-label" htmlFor="input__github-username">Github Username</label>
                <input type="text" className={gitNameError? `text-input text-input__error`:"text-input"} id="input__github-username"
                    value={gitName}
                    onChange={(e) => setGitName(e.target.value)} />
                {
                    gitNameError!==""&&
                    <div className="input-note">
                        <img className="error-logo" src="/icon-info.svg" alt="info icon" />
                        <p className="error-text">{gitNameError}</p>
                    </div>
                }

                <button ref={generateBtn} className="generate-btn" type="submit" id="submit-btn" onClick={handleGenerateTicket}>Generate My Ticket</button>
            </form>
        </>
    )
}

export default App
