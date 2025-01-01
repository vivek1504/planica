import { Router, Request, Response } from "express";
import prisma from "../prisma";
import { sign } from "jsonwebtoken";
import { JWTSECRET } from "..";
import { authMiddleware } from "../authMiddleware/authMiddleware";

const clientRouter = Router()


clientRouter.post("/login", async (req , res)=>{
    const {email , password} = req.body;

    try {
        const isValidClient = await prisma.client.findFirst({
            where : {email}
        })

        if(!isValidClient){
            res.json({msg : "user does not exists"});
            return
        }

        if(isValidClient.password != password){
            res.json({msg : "invalid password"})
            return
        }

        const token = sign({id: isValidClient?.id , email: isValidClient?.email},JWTSECRET)

        res.json({token,msg: "login successfull"})
      }
      catch(e){
        console.log(e) 
        res.json({msg : "internal server error"})
    }
})

clientRouter.post("/requestNewSubtask",authMiddleware, async (req , res)=>{
    const {id} = req.body.user;
    const {name, taskId, deadLine} = req.body;

    try {
        const isvalidTask = await prisma.task.findFirst({
            where : {id : taskId}
        })

        if(!isvalidTask){
            res.json({msg : "task with this id does not exists"})
            return
        }

        const newSubTaskRequest = await prisma.subTaskRequest.create({
            data : {
                name,
                taskId,
                requestedById : id,
                deadline : deadLine
            }
        })

        res.json({msg : "new sub task request added successfully"})
    }
    catch(e){
        console.log(e)
        res.json({msg : "internal server error"})
    }
})

clientRouter.put("/approveSubTaskCompletion",async (req , res)=>{
    const {subtaskId} = req.body

    try {
        const isvalidSubtask = await prisma.subTask.findFirst({
            where : {id : subtaskId}
        })

        if(!isvalidSubtask){
            res.json({msg : "invaild subtask id"})
        }

        const completedSubTask = await prisma.subTask.update({
            where : {id : subtaskId},
            data : {status : "COMPLETED"}
        })

        res.json({msg : "sub task completed"})
    }
    catch(e){
        console.log(e);
        res.json({msg : "internal server error"})
    }
})

clientRouter.put("/rejectSubTaskCompletion",async (req , res)=>{
    const {subtaskId} = req.body

    try {
        const isvalidSubtask = await prisma.subTask.findFirst({
            where : {id : subtaskId}
        })

        if(!isvalidSubtask){
            res.json({msg : "invaild subtask id"})
        }

        const completedSubTask = await prisma.subTask.update({
            where : {id : subtaskId},
            data : {status : "REJECTEDBYCLIENT"}
        })

        res.json({msg : "sub task completion rejected"})
    }
    catch(e){
        console.log(e);
        res.json({msg : "internal server error"})
    }
})

clientRouter.post("/messages",authMiddleware, async (req , res)=>{
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
                senderRole : "CLIENT"
            }
        })

        res.json({msg : "message sent successfully", newMessage})
    }
    catch(e){
        console.log(e)
        res.json({msg : "internal sever error"})
    }
})

export default clientRouter;