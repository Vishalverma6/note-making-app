const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;


const userRoutes = require('./routes/User');
const noteRoutes = require("./routes/notes");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const { cloudinaryConnect } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const cors = require("cors");




// database connection
database.connect();

// middlewares
app.use(express.json());
app.use(cookieParser());


app.use(
    cors({
        origin:"*",
        credentials:true,
    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

// cloudinary connect
cloudinaryConnect();

// routes 
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/note", noteRoutes);

// default route
app.use("/",(req, res)=> {
    return res.json({
        success:true,
        message:"Your server is up and running...",
    });
});

app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`)
})