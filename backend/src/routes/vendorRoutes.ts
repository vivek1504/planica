import { Router, Request, Response } from "express";
import prisma from "../prisma";
import { sign } from "jsonwebtoken";
import { JWTSECRET } from "..";
import { authMiddleware } from "../authMiddleware/authMiddleware";

const vendorRouter = Router()


vendorRouter.post("/login", async (req , res)=>{
    const {email , password} = req.body;

    try {
        const isValidVendor = await prisma.vendor.findFirst({
            where : {email}
        })

        if(!isValidVendor){
            res.json({msg : "user does not exists"});
            return
        }

        if(isValidVendor.password != password){
            res.json({msg : "invalid password"})
            return
        }

        const token = sign({id: isValidVendor?.id , email: isValidVendor?.email},JWTSECRET)

        res.json({token,msg: "login successfull"})
      }
      catch(e){
        console.log(e) 
        res.json({msg : "internal server error"})
    }
})