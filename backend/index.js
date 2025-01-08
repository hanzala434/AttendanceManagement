const express=require('express')
const dotenv=require('dotenv').config();
const port=process.env.PORT||5000;
const connectDB = require('./Config/db');
const {errorHandler}=require('./Middleware/ErrorMiddleware')
const cors=require('cors')
const multer = require('multer');
const path = require('path');


connectDB();
const app=express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//routes
app.use('/api/users',require('./Routes/UserRoutes'));
app.use('/api/attendance',require('./Routes/AttendanceRoutes'));
app.use('/api/leave',require('./Routes/LeaveRoutes'));




app.use(errorHandler);
app.listen(port,()=>console.log(`server started on port ${port}`));