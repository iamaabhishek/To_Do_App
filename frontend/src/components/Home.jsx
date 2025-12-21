import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'

const Home = () => {
    const [todos,setTodos] = useState([])
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)
    const [newTodos,setNewTodos] = useState("")
    

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

      setTodos(response.data);
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



    return (
    <div>Home</div>

  )
}

export default Home