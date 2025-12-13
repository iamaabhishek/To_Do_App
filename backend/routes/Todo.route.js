import express from "express"
import { CreateTodo } from "../controller/Todo.controller.js";



const router = express.Router();


router.post("/create",CreateTodo)

export default router



