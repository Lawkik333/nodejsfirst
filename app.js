import express from "express";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
const port=process.env.PORT||3000;
const filePath=path.join(import.meta.dirname,"views","index.htm");
const DATA_FILE=path.join(import.meta.dirname,"data","links.json");
const loadLink= async ()=>{
    try {
        const links=await fs.readFile(DATA_FILE,"utf-8");
        return JSON.parse(links);
    } catch (error) {
        if(error.code==="ENOENT")
        {
            await fs.writeFile(DATA_FILE,JSON.stringify({}));
        }
        return {};
    } throw error;
}
const savelink=async (links)=>{
    await fs.writeFile(DATA_FILE,JSON.stringify(links));
}

const app=express();
app.use(express.urlencoded({extended:true}));
app.use("/",express.static("public"));
app.get("/",async (req,res)=>{
    const links=await loadLink();
    
    const file=await fs.readFile(filePath); 
    const content=file.toString().replaceAll("{{URL_SHORTNER}}",Object.entries(links).map(
        ([shortCode,url])=>
        `<li><a href="/${shortCode}" target="_blank">${req.host}/${shortCode}</a></li>`
    ).join(""));
    
    return res.send(content);
});
app.post("/",async (req,res)=>{
    const links=await loadLink();
    const {url,shortCode}=req.body;
    const finalShortCode=shortCode||crypto.randomBytes(4).toString("hex");
    if(links[finalShortCode])
    {
         res.redirect("/");
    }
    links[finalShortCode]=url;
    await savelink(links);
    res.redirect("/")
});
app.get("/:shortlink",async (req,res)=>{
    const {shortlink}=req.params;
    const links=await loadLink();
    res.redirect(links[shortlink]);
    
});




app.listen(port, ()=>{
    console.log("Listening to port:",port);
})