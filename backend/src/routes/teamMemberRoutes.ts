import { Router, Request, Response } from "express";
import prisma from "../prisma";
import { sign } from "jsonwebtoken";
import { JWTSECRET } from "..";
import { authMiddleware } from "../authMiddleware/authMiddleware";

const teamMemberRouter = Router();

teamMemberRouter.post("/login", async (req , res)=>{
    const {email , password} = req.body;

    try {
        const isValidTeamMember = await prisma.teamMember.findFirst({
            where : {email}
        })

        if(!isValidTeamMember){
            res.json({msg : "user does not exists"});
            return
        }

        if(isValidTeamMember.password != password){
            res.json({msg : "invalid password"})
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

teamMemberRouter.post("/addSubTask",authMiddleware,async (req , res)=>{
    const {name, taskId, deadLine } = req.body;
    const {id } = req.body.user;

  try {
    const existingsubTask = await prisma.subTask.findFirst({
      where : {
        name
      }
    })

    if(existingsubTask){
      res.json({msg : "subTask with the same name exits"})
      return
    }

    const subTask = await prisma.subTask.create({
      data : {
        name,
        status : "CREATED",
        createdById : id,
        createdByRole : "TEAM_MEMBER",
        deadLine,
        task : {connect : {id : taskId}}
      }
    })

    res.json({msg : "subTask added successfully"})
  }
  catch(e){
    console.log(e)
    res.json({msg : "internal server error"})
  }
})

teamMemberRouter.post("/addSubTaskRequest",authMiddleware, async (req , res)=>{
    const {name,deadLine, taskId , requestedById} = req.body;
    

    try {
        const isvalidtask = await prisma.task.findFirst({
            where : {id : taskId}
        })

        const existingsubTask = await prisma.subTask.findFirst({
            where : {name}
        })

        const existingSubTaskRequest = await prisma.subTaskRequest.findFirst({
            where : {name}
        })

        if(!isvalidtask){
            res.json({msg : "this task does not exist"})
            return
        }

        if(existingSubTaskRequest && existingsubTask){
            res.json({msg : "sub task with same name already exists"})
            return
        }

        const newSubTaskRequest = await prisma.subTaskRequest.create({
            data : {
                name,
                taskId,
                requestedById,
                status : "PENDING",
                deadline : deadLine
            }
        })

        res.json({msg : "sub task request sent successfully"})
    }
    catch(e){
        console.log(e)
        res.json({msg : "internal server error"})
    }
})

teamMemberRouter.put("/subTaskCompletion",authMiddleware, async (req , res)=>{
    const {subTaskId} = req.body;
    
    try {
        const isValidSubtask = await prisma.subTask.findFirst({
            where : {id : subTaskId}
        })

        if(!isValidSubtask){
            res.json({msg : "Invalid sub task Id"})
            return
        }

        const completionRequest = await prisma.subTask.update({
            where : {id : subTaskId},
            data : {status : "UNDERREVIEWBYCLIENT"}
        })

        res.json({msg : "sub task completed"})
    }
    catch(e){
        console.log(e)
        res.json({msg : "internal sever error"})
    }
})

teamMemberRouter.put("/rejectSubTaskCompletion",authMiddleware, async (req , res)=>{
    const {subTaskId} = req.body;
 

    try {
        const isValidSubtask = await prisma.subTask.findFirst({
            where : {id : subTaskId}
        })

        if(!isValidSubtask){
            res.json({msg : "Invalid sub task Id"})
            return
        }

        const completionRequest = await prisma.subTask.update({
            where : {id : subTaskId},
            data : {status : "REJECTEDBYTEAMMEMBER"}
        })

        res.json({msg : "sub task completion request rejected"})
    }
    catch(e){
        console.log(e)
        res.json({msg : "internal sever error"})
    }
})

teamMemberRouter.get("/tasks",async (req , res)=>{
    const id = req.body.user

    try {
        const tasks = await prisma.task.findMany({
            where : {teamMemberId : id}
        })

        res.json({tasks})
    }
    catch(e){
        console.log(e)
        res.json({msg : "internal server error"})
    }
})

teamMemberRouter.get("/subTasks",async (req , res)=>{
    const id = req.body.user

    try {
        const subTasks = await prisma.subTask.findMany({
            where : {createdById : id, createdByRole : "MANAGER"}
        })

        res.json({subTasks})
    }
    catch(e){
        console.log(e)
        res.json({msg : "internal server error"})
    }
})

export default teamMemberRouter