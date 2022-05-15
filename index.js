const express = require('express')

const mongoose = require('mongoose')

const cors= require('cors')

const app = express()

const apiroute = require('./routes/auth')

let port = 3030


app.use(express.json(),cors())

app.use('/',apiroute)

app.listen(port, ()=>{
    console.log(`api running at "http://localhost:${port}/`)
})

const url = "mongodb+srv://akhilesh:AKHILESH007@cluster0.ma5a9.mongodb.net/Kellton-Ecommerce?retryWrites=true&w=majority"

const dotenv = require('dotenv')
dotenv.config()

mongoose.connect(url,{useNewUrlParser:true})
.then(() =>{
    console.log('Database connected')
}).catch(error => console.log(error))


