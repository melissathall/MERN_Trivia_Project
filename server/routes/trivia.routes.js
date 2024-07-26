
import { Router } from "express";
import TriviaController from "../controllers/trivia.controller.js"

//Creating a router variable for ease of use
const router = Router();

router.route("/trivias/toptenscores")
    .get(TriviaController.getAll)

router.route("/trivias/topscores")
    .get(TriviaController.getTopTen)

router.route("/trivias")
    .post(TriviaController.create)

router.route("/trivias/:id")
    .get(TriviaController.getOne)     //read one
    .put(TriviaController.updateOne)
    .delete(TriviaController.deleteOne)

export default router;