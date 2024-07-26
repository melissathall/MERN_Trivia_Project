// When I get my Player's answers array working need to get rid of dummy data
// write to the database the current player's score

import React from 'react'
import NavBar from '../components/NavBar'
import axios from 'axios';

const TheScore = (props) => {
    // console.log("In TheScore props = ", props);
    let singlePlayerScore = 0;

    //dummy data
    const PlayerAnswers = [
        ["Grandmaster Flash and the Furious Five", "correct"],
        ["Grandmaster Flash and the Furious Five", "correct"],
        ["Grandmaster Flash and the Furious Five", "incorrect"],
        ["Grandmaster Flash and the Furious Five", "correct"],
        ["Grandmaster Flash and the Furious Five", "incorrect"],
        ["Grandmaster Flash and the Furious Five", "correct"],
        ["Grandmaster Flash and the Furious Five", "correct"],
        ["Grandmaster Flash and the Furious Five", "incorrect"],
        ["Grandmaster Flash and the Furious Five", "correct"],
        ["Grandmaster Flash and the Furious Five", "incorrect"]
    ]
    
    //Need to calculate the score
    for (let i=0; i<PlayerAnswers.length; i++) {
        if (PlayerAnswers[i][1] === "correct") {
            singlePlayerScore++;
        }
    }
    let score = singlePlayerScore*10;

    const tempObjectToSendToServer = {nickName, score};

    // axios.post("http://localhost:8000/api/trivias", tempObjectToSendToServer)
    //         .then(serverRes => {
    //             console.log("SUCCESS", serverRes.data);
    //             //navigate("/trivias");

    //         })
    //         .catch(err => {
    //             console.log("ERROR", err.response.data);
    //             setErrors(err.response.data.errors);
    //         });
    


    return (
        <>
            <NavBar />
            <main className="d-flex align-items-center justify-content-center" id="mainContainer">
            <div className="welcomeBoxScores centerText">
                    
                    <h1 className="mb-3">{props.nickName}'s Score</h1>
                    <h1>{singlePlayerScore}%</h1><br />
                    <p>To play again click the Home button.</p>
                    <p>To see the Top 10 Scores click the Top Scores button.</p>
                    
                </div>
            </main>
            </>
    )
}

export default TheScore
