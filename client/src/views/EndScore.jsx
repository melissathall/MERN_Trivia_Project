import React from 'react'
import NavBar from '../components/NavBar'
import axios from 'axios';

const EndScore = (props) => {
    let singlePlayerScore = 0;
    let { nickName, singlePlayerAnswers } = props; //deconstructed look at syntax
    // console.log("In EndScore props = ", props);

    // console.log("singlePlayerAnswers[0] = ", singlePlayerAnswers[0]);

    //Need to calculate the score
    for (let i = 0; i < singlePlayerAnswers.length; i++) {
        let innerArray = singlePlayerAnswers[i];
        if (innerArray[0][1] === "correct") {
            console.log("Incrementing score");
            singlePlayerScore++;
        }
    }

    //console.log("singlePlayerScore = ", singlePlayerScore);
    let score = singlePlayerScore * 10;
    console.log("Score = ", score);

    const tempObjectToSendToServer = { nickName, score };

    axios.post("http://localhost:8000/api/trivias", tempObjectToSendToServer)
        .then(serverRes => {
            console.log("SUCCESS", serverRes.data);
            //navigate("/trivias");

        })
        .catch(err => {
            console.log("ERROR", err.response.data);
            setErrors(err.response.data.errors);
        });

    return (
        <>
            <NavBar />
            <main className="d-flex align-items-center justify-content-center" id="mainContainer">
                <div className="welcomeBoxScores centerText">

                    <h1 className="mb-3">{nickName}'s Score</h1>
                    <h1>{score}%</h1><br />
                    <p>To play again click the Home button.</p>
                    <p>To see the Top 10 Scores click the Top Scores button.</p>

                </div>
            </main>
        </>
    )
}

export default EndScore


