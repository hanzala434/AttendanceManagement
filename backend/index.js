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
app.use('/api/grade',require('./Routes/GradeRoutes'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'uploads')); // Set the destination folder
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Use a timestamp for unique filenames
    },
  });
const upload = multer({ storage });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/api/upload', upload.single('myFile'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    // const filePath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  
    //  const filePath = path.join('/uploads', req.file.filename); // Relative path for frontend
    const filePath = `/uploads/${req.file.filename}`;
    console.log('Uploaded file:', req.file);
    console.log(filePath);
    res.status(200).json({ message: 'File uploaded successfully', filePath });
  });


app.use(errorHandler);
app.listen(port,()=>console.log(`server started on port ${port}`));