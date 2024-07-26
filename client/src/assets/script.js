const parseQuizData = (quizAPIData) => {
    // Take the JSON data and create a singleQuizObject 
    // where I can alphabetize the 4 answers into an array with
    // their correct or incorrect status. Alphabetizing for display purposes.
    // 

    const singlePlayerArrayOfObjs = []; //Creating an array of objects

    for (const individualQuestion of quizAPIData) {
        // console.log(question);
        let questStem = individualQuestion.question.text;
        let ansArray = [
            [individualQuestion.correctAnswer,'correct'],
            [individualQuestion.incorrectAnswers[0],'incorrect'],
            [individualQuestion.incorrectAnswers[1],'incorrect'],
            [individualQuestion.incorrectAnswers[2],'incorrect'],
        ];
        ansArray.sort();

        // Now create the question/answers/studentAnswer obj 
        // and push it to the array
        let tempObj = {
            question: questStem,
            answers: ansArray,
            playerAnswered: ""
        };
        singlePlayerArrayOfObjs.push(tempObj);
        
        //console.log(questStem);
        //console.table(ansArray);
    }

    return singlePlayerArrayOfObjs;

}