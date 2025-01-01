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

vendorRouter.put("/submitSubTaskForCompletion",authMiddleware,async (req , res)=>{
    const {id} = req.body.user;
    const {subTaskId} = req.body;

    try {
        const isvalidsubTask = await prisma.subTask.update({
            where : {id : subTaskId},
            data : {status : "FINISHEDBYVENDOR"}
        })
        
        res.json({msg : "task submitted for approval"})
    }
    catch(e){
        console.log(e);
        res.json({msg : "internal server error"})
    }
})

vendorRouter.put("/NewTask",async (req , res)=>{
    const {id} = req.body.user;
    const {taskId , Response} : {taskId : number, Response : boolean} = req.body;
    
    try {
        const isValidtask = await prisma.task.findFirst({
            where : {id : taskId}
        })

       if(!isValidtask) {
        res.json({msg : "invalid task id"})
       }

       const accept = await prisma.task.update({
        where : {id : taskId},
        data : {approvedByVendor : Response}
       })

       res.json({msg : "task accepted successfully"})
    }
    catch(e){
        console.log(e);
        res.json({msg : "internal sever error"})
    }
})

vendorRouter.post("/messages",authMiddleware, async (req , res)=>{
    const {taskId, text} = req.body;
    const {id} = req.body.user;

    try {
        const isValidTask = await prisma.task.findFirst({
            where : {id : taskId}
        })

        if(!isValidTask){
            res.json({msg : "invalid taskId"});
            return
        }

        const newMessage = await prisma.comments.create({
            data : {
                text,
                taskId,
                senderId : id,
                senderRole : "VENDOR"
            }
        })

        res.json({msg : "message sent successfully", newMessage})
    }
    catch(e){
        console.log(e)
        res.json({msg : "internal sever error"})
    }
})

export default vendorRouter;