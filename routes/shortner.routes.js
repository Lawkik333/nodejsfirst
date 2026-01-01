

import { Router } from "express";
import { homefun,linkfun,postfun } from "../controllers/postshortner.controller.js";

const router= Router();

router.get("/", homefun);
    
    
router.post("/",postfun);

router.get("/:shortlink",linkfun);

export const shornerRoutes=router;