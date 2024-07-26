import NavBar from '../components/NavBar'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const HomeScreen = (props) => {

    let navigate = useNavigate();

    const [localNickName, setLocalNickName] = useState(''); //temp state just for this page
    const [nickNameError, setNickNameError] = useState('');
    const [goodToGo, setGoodToGo] = useState(false);

    const startSingleGame = () => {
        if (localNickName && !nickNameError) { //trying to stop from entering a game
            props.setNickName(localNickName);

            // Clear out the form input field
            setLocalNickName("");

            let path = `/trivias/singleQuiz`;
            navigate(path);
        }
        
    }

    const handleNickname = (e) => {
        setLocalNickName(e.target.value); //First set the state variable.
        if (e.target.value.length < 1) {
            setNickNameError("Nickname is required");
        } else if (e.target.value.length < 3) { 
            setNickNameError("Nickname must be more than 2 characters.");
        } else {
            setNickNameError(""); //An empty string is considered falsy.
        }
    }

    const startMultiGame = () => {
        // let path = `/trivias/multiQuiz`;
        // navigate(path);
        alert("Future feature to be developed.")
    }

    return (
        <>
            <NavBar />
            <main className="d-flex align-items-center justify-content-center" id="mainContainer">
            <div className="welcomeBox centerText" id="welcomeScreen">
                    
                    <h1 className="mb-3 largeFont">First Create Your Nickname</h1>
                    <input type="text" value={localNickName} className="marginBottom30" onChange={ handleNickname } placeholder='Enter a nickname' />
                    {
                        nickNameError && <p className="text-danger">{ nickNameError }</p>
                    }
                    <h1 className="largeFont mb-3">Then Select Your Game</h1>
                    <button className="btnStartGame showCursor marRight20" onClick={() => startSingleGame()} >Single Player</button>
                    <button className="btnStartGame disabled" onClick={() => startMultiGame()} >Multi Player</button>
                </div>
            </main>
        </>
    )
}

export default HomeScreen
