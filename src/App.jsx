import {useState,useRef} from 'react';
import './App.css';
import FileUploader from './components/FileUploader';
import Ticket from './components/Ticket';

function App() {
    const [filePath,setFilePath]=useState("");

    const [ticketValid,setTicketValid]=useState(false);
    const [fullname,setFullname]=useState("");
    const [email,setEmail]=useState("");
    const [gitName,setGitName]=useState("");
    const [fileError,setFileError]=useState("");
    const [nameError,setNameError]=useState("");
    const [emailError,setEmailError]=useState("");
    const [gitNameError,setGitNameError]=useState("");

    const generateBtn=useRef(null);

    const fileInstruction="Upload your photo (JPG or PNG, max size: 500KB).";
    const emailPattern=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const gitNamePattern=/^[@]?[a-zA-Z0-9-]*$/;

    function validateForm() {
        let results={
            "filePath":false,
            "fullName": false,
            "email": false,
            "gitName": false,
        };

        if(!filePath.trim()) {
            setFileError("Please select your avatar");
        }
        else {
            results["filePath"]=true;
        }

        if(!fullname.trim()) {
            setNameError("Please enter your full name");
        }
        else {
            setNameError("");
            results["fullName"]=true;
        }

        if(!email.trim()||!emailPattern.test(email.trim())) {
            setEmailError("Please enter a valid email");
        }
        else {
            setEmailError("");
            results["email"]=true;
        }

        if(!gitName.trim()||!gitNamePattern.test(gitName.trim())) {
            setGitNameError("Please enter a valid git username");
        }
        else {
            setGitNameError("");
            results["gitName"]=true;
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
        setTicketValid(isValid(validateForm()));
    }

    return (
        <>
            <div className="header">
                <h1><img src="/logo-full.svg" alt="logo" /></h1>
                {!ticketValid&&
                <>
                    <h2>Your Journey to Coding Conf 2025 Starts Here!</h2>
                    <p>Secure your spot at next year's biggest coding conference.</p>
                </>}
                {ticketValid&&
                <>
                    <h2>Congrats, <span className="congrat-fullname">{fullname}!</span> your ticket is ready.</h2>
                    <p>We've emailed your ticket to <span className="congrat-email">{email}</span> and will send updates in the run up to the event</p>
                </>}
            </div>

            {ticketValid&&<Ticket email={email} fullname={fullname} gitName={gitName} />}
            {!ticketValid&&
                <form>
                    <FileUploader setAvatarUrl={setFilePath} setFileError={setFileError} />
                    {
                        fileError!==""&&
                        <div className="input-note">
                            <img className="error-logo" src="/icon-info.svg" alt="info icon" />
                            <p className="error-text">{fileError}</p>
                        </div>
                    }
                    {
                        fileError===""&&filePath===""&&
                        <div className="input-note">
                            <img src="/icon-info.svg" alt="info icon" />
                            <p>{fileInstruction}</p>
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
                        placeholder="example@email.com"
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
                        placeholder="@gitusername"
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
            }
           
        </>
    )
}

export default App
