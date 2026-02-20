import {useState} from 'react';
import './App.css';

function App() {
    const [filePath,setFilePath]=useState("");
    const [fullname,setFullname]=useState("");
    const [email,setEmail]=useState("");
    const [gitName,setGitName]=useState("");
    const [fileError,setFileError]=useState("");
    const [nameError,setNameError]=useState("");
    const [emailError,setEmailError]=useState("");
    const [gitNameError,setGitNameError]=useState("");

    function validateForm() {
        let results={
            "filePath":false,
            "firstName": false,
            "email": false,
            "gitName": false,
        };

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
        if(!isValid(validateForm())) {
            return;
        }

    }

    return (
        <>
            <div>
                <img src="/logo-full.svg" alt="logo" />
                <h1>Your Journey to Coding Conf 2025 Starts Here!</h1>
                <p>Secure your spot at next year's biggest coding conference.</p>
            </div>
            <form>
                <label htmlFor="drop-zone">Upload Avatar</label>
                <label id="drop-zone">
                    Drop and drag or click to upload
                    <input type="file" id="file-input" accept="image/png, image/jpeg" />
                </label>
                {fileError!==""&&<p className="error-text">{fileError}</p>}

                <label for="input__full-name">Full Name</label>
                <input type="text" className="input__full-name" id="input__full-name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)} />
                {nameError!==""&&<p className="error-text">{nameError}</p>}

                <label for="input__email">Email Address</label>
                <input type="text" className="input__email" id="input__email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                {emailError!==""&&<p className="error-text">{emailError}</p>}

                <label for="input__github-username">Github Username</label>
                <input type="text" className="input__github-username" id="input__github-username"
                    value={gitName}
                    onChange={(e) => setGitName(e.target.value)} />
                {gitNameError!==""&&<p className="error-text">{gitNameError}</p>}

                <button type="submit" id="submit-btn" onClick={handleGenerateTicket}>Generate My Ticket</button>
            </form>
        </>
    )
}

export default App
