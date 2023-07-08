const express = require('express')
const app = express()
const port = 5000


//available routes 

app.use("/api/auth",require("./routes/auth"))
app.use("/api/notes",require("./routes/notes"))


app.get('/', (req, res) => {
    res.send('Hello World hi!')
})




//roue for signup
app.get('/signup', (req, res) => {
    res.send('Hello World signup!')
})

// route for login
app.get('/login', (req, res) => {
    res.send('Hello World login!')
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
const connectToMongo=require("./Database/db")
connectToMongo();


