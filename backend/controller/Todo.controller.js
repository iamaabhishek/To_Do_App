
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


export const getTodos = async(req,res) =>{
    try{
        const todos = await Todo.find()
        res.status(201).json({message :"Todo Fetched Succesfully ",todos})
    }catch(error){
        console.log(error);
        res.status(400).json({message :" Error Occure in Todo Fetching "})

    }
}



export const updateTodos = async(req,res) =>{
    try{
        const todos = await Todo.findByIdAndUpdate(req.params.id , req.body,{
            new:true
        })
        res.status(201).json({message :"Todo Update Succesfully ",todos})
    }catch(error){
        console.log(error);
        res.status(400).json({message :" Error Occure in Todo Updating "})

    }
};



export const deleteTodos = async(req,res) =>{
    try{
        await Todo.findByIdAndDelete(req.params.id)
        res.status(201).json({message :"Todo delete Succesfully "})
    }catch(error){
        console.log(error);
        res.status(400).json({message :" Error Occure in Todo Deleting "})

    }
}





