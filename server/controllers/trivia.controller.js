//Point of controller is CRUD
import Trivia from '../models/trivia.model.js';

const TriviaController = {
    getAll: async (req, res) => {
        try {
            const allTrivias = await Trivia.find();
            res.json(allTrivias);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
    getTopTen: async (req, res) => {
    try{
        const allTrivias = await Trivia.find().sort('score', -1).limit(10);
        console.log("All Trivias = ", allTrivias);
        allTrivias = allTrivias.sort('score', -1);
        console.log("All Trivias = ", allTrivias);
        res.json(allTrivias);
    } catch(err) {
        console.log(err);
        res.status(400).json(err);
    }
},
    create: async (req, res) => {
        try {
            const newTrivia = await Trivia.create(req.body);
            res.json(newTrivia);
            // console.log("req = ", req);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },
        getOne: async (req, res) => {
            try {
                const oneTrivia = await Trivia.findById(req.params.id);
                res.json(oneTrivia);
            } catch (err) {
                console.log(err);
                res.status(400).json(err);
            }
        },
            updateOne: async (req, res) => {
                const options = {
                    new: true, //returning the updated Meal (false returns the original Trivia)
                    runValidators: true, // to run the validation
                };
                try {
                    const updatedTrivia = await Trivia.findByIdAndUpdate(req.params.id, req.body, options);
                    res.json(updatedTrivia);
                } catch (err) {
                    console.log(err);
                    res.status(400).json(err);
                }
            },
                deleteOne: async (req, res) => {
                    try {
                        const deleteTrivia = await Trivia.findByIdAndDelete(req.params.id);
                        res.json(deleteTrivia);
                    } catch (err) {
                        console.log(err);
                        res.status(400).json(err);
                    }
                }
}

export default TriviaController;