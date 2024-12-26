import { Router, Request, Response } from "express";
import prisma from "../prisma";
import { sign } from "jsonwebtoken";
import { JWTSECRET } from "..";

const teamMemberRouter = Router();

teamMemberRouter.post("/login", async (req , res)=>{
    const {email , passport} = req.body;

    try {
        const isValidTeamMember = await prisma.teamMember.findFirst({
            where : {email}
        })

        if(!isValidTeamMember){
            res.json({msg : "user does not exists"});
            return
        }

        const token = sign({id: isValidTeamMember?.id , email: isValidTeamMember?.email},JWTSECRET)

        res.json({token,msg: "login successfull"})
      }
      catch(e){
        console.log(e)
        res.json({msg : "internal server error"})
    }
})

export default teamMemberRouter