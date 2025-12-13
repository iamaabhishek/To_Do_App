import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"

import todoRoute from "../backend/routes/Todo.route.js"

const app = express()

dotenv.config()

const port = process.env.PORT || 4000
const DB_URL = process.env.MONGODB_URL


// 
try {
  await  mongoose.connect(DB_URL);
  console.log("Conected To Mongo")
} catch (error) {
  console.log(error)
}


app.get('/', (req, res) => {
  res.send('Hello World!')
})


// 
app.use(express.json())
app.use('/todo',todoRoute)





app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
