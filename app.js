import express from "express";
import {shornerRoutes} from "./routes/shortner.routes.js";

const port=process.env.PORT||3000;

const app=express();
app.use(express.urlencoded({extended:true}));
app.use("/",express.static("public"));

app.use(shornerRoutes);




app.listen(port, ()=>{
    console.log("Listening to port:",port);
})