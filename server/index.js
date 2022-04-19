import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import dotenv from "dotenv";
const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts",postRoutes);

//after development change the database to production in mongo atlas
//https://www.mongodb.com/cloud/atlas;

// const CONNECTION_URL = 'mongodb://localhost:27017/memoriesapp';
const CONNECTION_URL = process.env.DATABASE;

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser: true,useUnifiedTopology: true})
    .then(()=>app.listen(PORT,()=>{
        console.log(`Server running on Port ${PORT}`)
    }))
    .catch((err)=>{
        console.log(err.message);
    })
// mongoose.set('useFindAndModify',false);
