import { useState } from 'react';
import './App.css';
import HomeScreen from './views/HomeScreen';
import TopTenScores from './views/TopTenScores';
import SinglePlayerQuiz from './views/SinglePlayerQuiz'
import EndScore from './views/EndScore'
import { Routes, Route, Link, Navigate } from 'react-router-dom';

function App() {

  // lifted state created in HomeScreen component
  const [nickName, setNickName] = useState(''); //lifted state
  const [sortedSingleQuiz, setSortedSingleQuiz] = useState([]);   //filtered and sorted raw data
  const [singlePlayerAnswers, setSinglePlayerAnswers] = useState([]); // array to hold player answers
  // const [singlePlayerObj, setSinglePlayerObj] = useState({});

  return (
    <>
      {/* ROUTES  */}
      <Routes>

        {/* Redirect */}
        <Route path="/" element={<Navigate to="/trivias" />} />

        {/* Dashboard */}
        <Route path="/trivias" element={<HomeScreen nickName={nickName} setNickName={setNickName} />} />

        {/* Single Player Quiz */}
        <Route path="/trivias/singleQuiz" element={<SinglePlayerQuiz 
                                          nickName={nickName} 
                                          setSortedSingleQuiz={setSortedSingleQuiz}
                                          sortedSingleQuiz = {sortedSingleQuiz}
                                          setSinglePlayerAnswers = {setSinglePlayerAnswers}
                                          />} />

        {/* Final Single Score */}
        <Route path="/trivias/theScore" element={<EndScore nickName={nickName} 
                                                  singlePlayerAnswers={singlePlayerAnswers}
                                                />} />

        {/* Final Single Score */}
        {/* <Route path="/trivias/theScore" element={<EndScore />} /> */}

        {/* Top Ten Scores */}
        <Route path="/trivias/toptenscores" element={<TopTenScores />} />

      </Routes>
    </>
  )
}

export default App
