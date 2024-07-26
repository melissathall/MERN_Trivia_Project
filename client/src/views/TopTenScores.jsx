import NavBar from '../components/NavBar';
import axios from 'axios';
import { useEffect, useState } from 'react';

const TopTenScores = () => {
  const [triviaScoreList, setTriviaScoreList] = useState([]);

  // Runs after the component is finished rendering (2 params - callback function and optional dependency array)
  useEffect(() => {
    axios.get("http://localhost:8000/api/trivias/toptenscores")
      // .then has a callback function to retrieve data
      .then((serverResponse) => {
        //console.log(serverResponse.data); //Axios puts everything in it's own key called data.
        setTriviaScoreList(serverResponse.data);
      })
      .catch(err => console.log(err));
  }, []);

  // sort the triviaScoreList by score which is an array of objects with the
  // following key values: _id, nickname, score.

  //This needs to be spread instead of using let -FIGURE OUT LATER
  let tempScoreArray = [];

  tempScoreArray = triviaScoreList.sort((a, b) => b.score - a.score);
  // console.log("tempScoreArray = ", tempScoreArray);

  function compareScoreColumn(a, b) {
    if (a[1] === b[1]) {
      return 0;
    }
    else {
      return (a[1] > b[1]) ? -1 : 1;
    }
  }

  const topTenArray = tempScoreArray.slice(0, 10);
  // console.log("topTenArray = ", topTenArray);

  return (
    <div>
      <NavBar />
      <div className="d-flex align-items-center justify-content-center mainScores">
        <div className="welcomeBoxScores centerText">

          <h1 className="mb-3 largeFont">Top 10 Scores</h1>
          <table className="table table-info table-striped">
            <thead>
              <tr>
                <th className="positionColTable" scope="col">Position</th>
                <th scope="col">Name</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              {
                topTenArray.map((theTriviaScore, index) => {
                  return (
                    <tr key={theTriviaScore._id}>
                      <td scope="row">{index+1}</td>
                      <td>{theTriviaScore.nickName}</td>
                      <td>{theTriviaScore.score}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TopTenScores
