
import {loadLink,savelink} from "../models/shortner.model.js"
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";

const filePath=path.join("views","index.htm");

export const homefun= async (req,res)=>{
    const links=await loadLink();
    
    const file=await fs.readFile(filePath); 
    const content=file.toString().replaceAll("{{URL_SHORTNER}}",Object.entries(links).map(
        ([shortCode,url])=>
        `<li><a href="/${shortCode}" target="_blank">${req.host}/${shortCode}</a></li>`
    ).join(""));
    return res.send(content);
}


export const postfun=async (req,res)=>{
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
}

export const linkfun=async (req,res)=>{
    const {shortlink}=req.params;
    const links=await loadLink();
    if(!links[shortlink]) res.redirect("/");
    else
    res.redirect(links[shortlink]);
    
    
}