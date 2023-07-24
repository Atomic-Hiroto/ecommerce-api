const express = require("express")
const cors = require("cors")
const dotenv = require('dotenv');

dotenv.config();
const app = express()
app.use(cors())

app.get("/",(req,res)=>{
    res.send("Working")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server start on http://localhost:${PORT}`)
})