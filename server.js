const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const path = require('path')
const connectDb = require('./config/connectDb')
dotenv.config()

//database call
connectDb()

const app=express()

//Middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

//Routes
app.use('/users',require( './routes/userRoute'))
app.use('/transaction',require('./routes/transactionRoute'))

//STATIS FILES
app.use(express.static(path.join(__dirname, './client/build')))
app.get('*', function(req,res){
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

//PORT
const PORT = 4000

//LISTING
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
