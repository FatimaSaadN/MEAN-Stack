import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import roleRoute from './routes/role.js'
import authRoute from './routes/auth.js'
import userRoute from './routes/user.js'
import roles from './models/Role.js'
import users from './models/User.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
dotenv.config();
app.use(express.json());

//connect mongodb
const connectMongoDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected');

    } catch {
        throw objor;
    }
} 
//app cookie parser
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}));
app.use("/api/role/", roleRoute)
app.use('/api/auth/', authRoute)
app.use("/api/user/", userRoute)

//Response handler middleware
// app.use((obj, req, res, next)=>{
//     //catch status code
//     const statusCode = obj.status || 500;
//     //objor message
//     const message = obj.message || 'Internal Server error';
//     //return response in json
//     res.status(statusCode).json({
//         success: [200,201,204].some(a=> a === obj.status) ? true : false,
//         status: statusCode,
//         message: message, 
//         data: obj.data
//     });

// });
// app.use((err, req, res, next) => {
//     // Catch status code
//     const statusCode = err.status || 500;
//     // Catch error message
//     const message = err.message || 'Internal Server Error';
//     // Return response in JSON
//     res.status(statusCode).json({
//         success: false,
//         status: statusCode,
//         message: message,
//         data: err.data || null
//     });
// });

app.use((obj, req, res, next) => {
    if (obj instanceof Error) {
        // Error handling
        const statusCode = obj.status || 500;
        const message = obj.message || 'Internal Server Error';
        res.status(statusCode).json({
            success: false,
            status: statusCode,
            message: message,
            data: obj.data || null
        });
    } else {
        // Success handling
        const statusCode = obj.status || 200;
        res.status(statusCode).json({
            success: [200, 201, 204].includes(statusCode),
            status: statusCode,
            message: obj.message || 'Success',
            data: obj.data || null
        });
    }
});


app.listen(8800, ()=>{
    connectMongoDB();
    console.log('Server conected to backend');
});

