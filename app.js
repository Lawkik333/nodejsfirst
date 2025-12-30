import express from "express";
import fs from "fs/promises";
import path from "path";
const port=process.env.PORT||3000;
const filePath=path.join(import.meta.dirname,"views","index.htm");
const app=express();
app.use("/",express.static("public"));
app.get("/",async (req,res)=>{
    const file=await fs.readFile(filePath); 
    const content=file.toString().replaceAll("{{URL_SHORTNER}}",`<li>Port nuber is: ${port}</li>`);
    res.send(content);
});


app.listen(port, ()=>{
    console.log("Listening to port:",port);
})