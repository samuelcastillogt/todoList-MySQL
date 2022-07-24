const express = require("express")
const path = require("path")
const port = 3000
const app = express()
const tasks = require("./routes/tasks.js")
app.use(express.static(path.join(__dirname, 'static')))
app.use(express.json())
app.listen(port, ()=> console.log("server"))
app.get("/", (req, res)=>{
    res.sendFile("index.html")    
})
app.use("/tasks", tasks)
