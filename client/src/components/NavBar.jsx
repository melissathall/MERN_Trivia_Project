// import axios from 'axios';
// import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import pic from '../assets/TriviaNightIcon.jpg'

const navBar = () => {

    let navigate = useNavigate();

    const topScores = () => {
        let path = `/trivias/toptenscores`;
        navigate(path);
    }

    const goHome = () => {
        let path = `/trivias`;
        navigate(path);
    }


    return (
        <nav className="container-fluid d-flex justify-content-between">
            <div>
                <img src={pic} alt="Trivia Night icon" height="70px"></img>
            </div>
            <div className="mb-2 rightText">
                <h1 className="headerWhiteText">The Ultimate Online Trivia Quiz</h1>
                <button type="button" className="btn btn-info marginRight20" onClick={() => goHome()}>Home</button>
                <button type="button" className="btn btn-info" onClick={() => topScores()}>Top Scores</button>
                {/* <Link to={"/trivias/toptenscores"}>Top Scores</Link> */}
            </div>
        </nav>
    )
}

export default navBar
