
import {loadLink,savelink} from "../models/shortner.model.js"
import crypto from "crypto";






export const homefun= async (req,res)=>{
    const links=await loadLink();
   
    
    return res.render("index", {links,hosts:req.host})
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