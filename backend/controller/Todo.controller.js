
import Todo from '../model/Todo.model.js'

export const CreateTodo = async (req,res) => {
    const todo = new Todo({
        text : req.body.text,
        complete : req.body.complete
    });

    try {
        const newTodo = await todo.save();
        res.status(201).json({message :"Todo Create Succesfully "})

        
    } catch (error) {
        console.log(error);
        res.status(400).json({message :" Error Occure in Todo Creation "})
        
        
    }
}













