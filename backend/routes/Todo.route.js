import express from "express"
import { CreateTodo, getTodos, updateTodos ,deleteTodos } from "../controller/Todo.controller.js";
// import {
//     CreateTodo,
//     getTodos,
//     updateTodos,
//     deleteTodos
// } from "../controllers/Todo.controller.js";


const router = express.Router();


router.post("/create",CreateTodo)
router.get("/fetch",getTodos)
router.put("/update/:id",updateTodos)
router.delete("/delete/:id",deleteTodos)





export default router



