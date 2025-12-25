import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const Home = () => {
    const [todos,setTodos] = useState([])
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)
    const [newTodos,setNewTodos] = useState("")
    
// For Fecthing data
useEffect(() => {
    const fetchtodos = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/todo/fetch",
        { withCredentials: true }
      );

      console.log("Response:", response);
      console.log("Todos:", response.data);

      setTodos(response.data.todos);
      setError(null);
    } catch (error) {
      console.log("Error:", error);
      setError("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  fetchtodos();
}, []);

// For Creating Todo      
    const todoCraete =  async () =>{
        if(!newTodos) return;
        try {
            const response = await axios.post("http://localhost:5000/todo/create",{
                text:newTodo,
                completed:false
            },{
                withCredentials:true

            })
            setTodos(...todos,response.data)
        } catch (error) {
            setError("Failled to create todo ")
        }
    }



const todoStatus = async (id) =>{
  const todo = todos.find((t) => t._id===id)  
  try {
    const response = await axios.post(`http://localhost:5000/todo/update/${id}`,{
      ...todo,
      completed:!todo.completed
    },{
        withCredentials:true
      
    })
    setTodos(todos.map((t) => t._id === id ? response.data:t))
  } catch (error) {
    setError("Failled to find todo Status ")
  }
}


const todoDelete = async (id) =>{
  try {
    await axios.delete(`http://localhost:5000/todo/delete/${id}`,{withCredentials:true})
    setTodos(todos.filter((t) =>t._id !== id))
  } catch (error) {
    setError("Failed to Delete Todo");
  }
}


    return (
      < >
        <div className="bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx-8 sm:mx-auto p-6"> 
          <div className='text-2xl font-semibold text-center'>Todo List</div>
          <div className='flex mb-4'>
            <input type="text" 
              placeholder='Add a new todo' 
              className='flex-grow p-2 border rounded-l-md focus:outline-none'/>
            <button className='bg-blue-600 border rounded-r-md text-white px-4 py-2 hover:bg-blue-900 duration-300' > Add </button>
          </div>
          <ul className='space-y-2'>
            {todos.map((todo,index) => (
            <li className='flex items-center justify-between p-3 bg-gray-100 rounded-md'>
              <div className='flex  items-center'>
                <input type="checkbox" />
                <span className='text-gray-500'> {todo.text} </span>
              </div> 
              <button className='text-red-500 hover:text-red-800 duration-300'> Delete </button>
            </li> 
            ))}
          </ul>

          <p className='mt-4 text-center text-sm text-gray-700 '> 0 Todo Remaining </p>
          <button className='mt-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 duration-500 mx-auto block'> Logout </button>
        </div>
      </>
  )
}

export default Home