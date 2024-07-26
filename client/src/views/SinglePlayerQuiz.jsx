import NavBar from '../components/NavBar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SinglePlayerQuiz = (props) => {
    let nickName = props.nickName;
    //console.log("In Single Player Quiz nickName = ", nickName);
    let navigate = useNavigate();

    const [singleQuiz, setSingleQuiz] = useState([]);   //API raw data
    const [loading, setLoading] = useState("AnsD leftText");
    const [questCount, setQuestCount] = useState(1);  //session var to hold the current quest number 
    const [ansADisplay, setAnsADisplay] = useState("AnsA leftText");
    const [ansBDisplay, setAnsBDisplay] = useState("AnsB leftText");
    const [ansCDisplay, setAnsCDisplay] = useState("AnsC leftText");
    const [ansDDisplay, setAnsDDisplay] = useState("AnsD leftText");
    const [showNextBtn, setShowNextBtn] = useState(false);  //Next button should only show once question is answered
    const [remedMsg, setRemedMsg] = useState("");
    const [questAnswered, setQuestAnswered] = useState(false);
    const [localPlayerAnswers, setLocalPlayerAnswers] = useState([]);

    
    //const localPlayerAnswers = []; //Array to store player's 10 answers

    // Runs after the component is finished rendering (2 params - callback function and optional dependency array)
    useEffect(() => {
        axios.get("https://the-trivia-api.com/v2/questions")
            .then((serverResponse) => {
                //console.log(serverResponse.data);
                setSingleQuiz(serverResponse.data);   //.data is a part of Axios
                props.setSortedSingleQuiz(parseQuizData(serverResponse.data));
                setLoading(false);
            })
            .catch(err => console.log(err));
    }, []);

    const parseQuizData = (APIQuizData) => {
        const singlePlayerArrayOfObjs = []; //Creating an array of objects for questions

        for (const individualQuestion of APIQuizData) {
            let questStem = individualQuestion.question.text;
            let ansArray = [
                [individualQuestion.correctAnswer, 'correct'],
                [individualQuestion.incorrectAnswers[0], 'incorrect'],
                [individualQuestion.incorrectAnswers[1], 'incorrect'],
                [individualQuestion.incorrectAnswers[2], 'incorrect'],
            ];
            ansArray.sort();

            let tempObj = {
                question: questStem,
                answers: ansArray
                // playerAnswered: ['', '']
            };
            singlePlayerArrayOfObjs.push(tempObj);

            console.log(questStem);
            console.table(ansArray);
        }
        return singlePlayerArrayOfObjs;
    }

    const recAnswer = (numSelected) => {
        // accepts the number value for the answer selected
        // console.log(numSelected);
        // The number selected corresponds to the answers object array
        const tempArr = [];

        if (!questAnswered) {
            // Player hasn't answered yet
            setQuestAnswered(true);

            //get question answer info to write to playerAnswered
            let arrElem1 = props.sortedSingleQuiz[questCount - 1].answers[numSelected][0];
            let arrElem2 = props.sortedSingleQuiz[questCount - 1].answers[numSelected][1];
            // console.log("arrElem1 = ", arrElem1);
            // console.log("arrElem2 = ", arrElem2);

            tempArr.push([arrElem1, arrElem2]);
            // console.log("tempArr = ", tempArr);
            setLocalPlayerAnswers([...localPlayerAnswers, tempArr]);
            // console.log("localPlayerAnswers = ", localPlayerAnswers);

            if (arrElem2 === "incorrect") {
                setRemedMsg("Incorrect");
            } else {
                setRemedMsg("Correct!");
            };

            // numSelected 0=A, 1=B, 2=C, 3=D 
            // create the var to dynamically show the correct answer highlighted in green

            if (props.sortedSingleQuiz[questCount - 1].answers[0][1] === "correct") {
                setAnsADisplay("AnsACorrect leftText");
            }
            if (props.sortedSingleQuiz[questCount - 1].answers[1][1] === "correct") {
                setAnsBDisplay("AnsBCorrect leftText");
            }
            if (props.sortedSingleQuiz[questCount - 1].answers[2][1] === "correct") {
                setAnsCDisplay("AnsCCorrect leftText");
            }
            if (props.sortedSingleQuiz[questCount - 1].answers[3][1] === "correct") {
                setAnsDDisplay("AnsDCorrect leftText");
            }

            //const tempArr = [arrElem1, arrElem2];
            //Now I need to write tempArray to setSortedSingleQuiz[questCount-1].playerAnswered
            // console.log("localPlayerAnswers =", localPlayerAnswers)

            // Show the NEXT button
            setShowNextBtn(true);

        }
    }

    const continueSingleGame = () => {

        setQuestCount(questCount + 1);
        //console.log("Counter Incremented ", questCount);

        if (questCount < 10) {
            //Still in quiz
            // Reset showNextBtn, remedMsg, and the correct States for answer divs
            setShowNextBtn(false);
            setQuestAnswered(false);
            setRemedMsg("");
            setAnsADisplay("AnsA leftText");
            setAnsBDisplay("AnsB leftText");
            setAnsCDisplay("AnsC leftText");
            setAnsDDisplay("AnsD leftText");

            navigate("/trivias/singleQuiz");
        } else {

            //console.log("localPlayerAnswers =", localPlayerAnswers);
            
            // localPlayerAnswers.push(tempArr);
            props.setSinglePlayerAnswers(localPlayerAnswers);

            navigate("/trivias/theScore/", { nickName: { nickName } });

        };

    }

    return (
        <div>
            <NavBar />
            <div className="d-flex align-items-center justify-content-center mainScores">
                <div className="welcomeBoxScores centerText">
                    {/* {JSON.stringify(singleQuiz)} */}

                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <h3 className="leftText mediumFont marginBottom10"><span id="questNum">Question {questCount} of 10</span></h3>
                            <hr className="marginTop20 marginBottom20"></hr>
                            <p className="questStem leftText mediumFont marginBottom20" id="questStem">{props.sortedSingleQuiz[questCount - 1].question}</p>
                            <div className="leftText">
                                <div className={ansADisplay} onClick={() => recAnswer(0)}>{props.sortedSingleQuiz[questCount - 1].answers[0][0]}</div><br />
                                <div className={ansBDisplay} onClick={() => recAnswer(1)}>{props.sortedSingleQuiz[questCount - 1].answers[1][0]}</div><br />
                                <div className={ansCDisplay} onClick={() => recAnswer(2)}>{props.sortedSingleQuiz[questCount - 1].answers[2][0]}</div><br />
                                <div className={ansDDisplay} onClick={() => recAnswer(3)}>{props.sortedSingleQuiz[questCount - 1].answers[3][0]}</div>
                            </div>
                            <hr className="marginTop20 marginBottom20"></hr>
                            <div className="d-flex align-items-center justify-content-around">
                                <p className="correctMsg">{remedMsg}</p>
                                {showNextBtn && <button className="btn btnNextGame" onClick={() => continueSingleGame()}>Next</button>}
                            </div>

                        </>
                    )}

                    {/* {JSON.stringify(sortedSingleQuiz)} */}
                </div>
            </div>
        </div>

    )
}

export default SinglePlayerQuiz
