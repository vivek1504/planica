import { Router, Request, Response } from "express";
import prisma from "../prisma";
import { sign } from "jsonwebtoken";
import { JWTSECRET } from "..";
import { connect } from "http2";
import { authMiddleware } from "../authMiddleware/authMiddleware";

const managerRouter : Router = Router();


managerRouter.post("/signup", async (req, res) => {
  const { name, email, number, password } = req.body;

  try {
    const existingUser = await prisma.eventManager.findFirst({
      where: {
        OR: [
          { email },
          { number }
        ]
      }
    });

    if (existingUser) {
      res.status(400).json({ msg: "User already exists" });
      return ;
    }

    const user = await prisma.eventManager.create({
      data: {
        name,
        email,
        number,
        password,
      },
    });

    const token = sign({ id: user.id, email }, JWTSECRET);

    res.status(201).json({ msg: "User created successfully", token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ msg: "Internal server error" });
  }
});

managerRouter.post("/login", async (req , res)=>{
  const {email , password} = req.body;

  try {
    const isExistingUser = await prisma.eventManager.findUnique({
      where : {
        email
      }
    })

    if(!isExistingUser){
      res.json({msg : "user does not exist. try signing first"})
    }

    const token = sign({id: isExistingUser?.id , email: isExistingUser?.email},JWTSECRET)

    res.json({token,msg: "login successfull"})
  }
  catch(e){
    console.log(e)
    res.json({msg : "internal server error"})
  }
})

managerRouter.post("/createVendor",async(req ,res)=>{
  const {name, email, password, number} = req.body;

  try {
    const existingVendor = await prisma.vendor.findFirst({
      where: {
        OR: [
          { email },
          { number }
        ]
      }
    });

    if(existingVendor){
      res.json({msg : "user already exits try loging in "})
      return;
    }

    const vendor = await prisma.vendor.create({
      data : {
        email,
        number,
        password,
        name
      }
    })

    res.json({msg:"Vendor created successfully",email:vendor.email,password: vendor.password})
  }
  catch (e){
    console.log(e)
    res.json({msg: "internal server error"})
  }
})

managerRouter.post("/createTeamMemeber",async (req , res)=>{
  const {name, email, number, password} = req.body;

  try {
    const isExistingTeamMember = await prisma.teamMember.findFirst({
      where : {
        OR : [
          {email},
          {password}
        ]
      }
    })

    if(isExistingTeamMember){
      res.json({msg: "user already exists"})
      return
    }

    const teamMember = await prisma.teamMember.create({
      data : {
        email,
        name,
        number,
        password
      }
    })

    res.json({msg : "vendor created successfully", email,password})
  }
  catch(e){
    console.log(e)
    res.json({msg: "internal server error"})
  }
})

managerRouter.post("/createClient",async (req , res)=>{
  const {name, email, number, password} = req.body;

  try {
    const isExistingVendor = await prisma.client.findFirst({
      where : {
        OR : [
          {email},
          {password}
        ]
      }
    })

    if(isExistingVendor){
      res.json({msg: "user already exists"})
      return
    }

    const vendor = await prisma.client.create({
      data : {
        email,
        name,
        number,
        password
      }
    })

    res.json({msg : "vendor created successfully", email,password})
  }
  catch(e){
    console.log(e)
    res.json({msg: "internal server error"})
  }
})

managerRouter.post("/createEvent", async (req ,res)=>{
  const {name,clientId, managerId, deadLine} = req.body;

  try {
    const existing = await prisma.event.findFirst({
      where : {
        name
      }
    })

    if(existing){
      res.json({msg : "an event with the same name already exits"})
      return
    }

    const event = await prisma.event.create({
      data : {
        name,
        deadLine : new Date(deadLine) ,
        Client : {connect : {id : clientId}},
        manager : {connect : {id : managerId}},
        teamMembers : {create : []},
        tasks : {create : []},
      }
    })
    res.json({msg:"event created successfully",event})
  }
  catch(e){
    console.log(e);
    res.json({msg : "internal server error"})
  }
})

managerRouter.post("/addTask",async (req , res)=>{
  const {name, eventId, vendorId, teamMemberId ,deadLine } = req.body;

  try {
    const existingTask = await prisma.task.findFirst({
      where : {
        name
      }
    })

    if(existingTask){
      res.json({msg : "Task with this name exists"})
      return
    }

    const newTask = await prisma.task.create({
      data : {
        name,
        deadLine : new Date(deadLine) ,
        vendor : {connect : {id : vendorId}},
        teamMember : {connect : {id : teamMemberId}},
        event : {connect : {id : eventId}},
        subTaskRequest : {create : []},
        subtasks : {create : []},
        status : "CREATED"
      }
    })

    res.json({msg : "task created successfully"})
  }
  catch(e){
    console.log(e);
    res.json({msg : "internal server error"})
  } 
})

managerRouter.post("/addSubTask", async (req , res)=>{
  const {name, taskId, createdById, deadLine } = req.body;

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
        createdById,
        createdByRole : "MANAGER",
        deadLine : new Date(deadLine) ,
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

// managerRouter.post("/addTeamMemberToTask", async (req ,res) =>{
//   const {teamMemberId, taskId} = req.body;

//   try {
//     const isTeamMemberId = await prisma.teamMember.findFirst({
//       where : {id : teamMemberId}
//     })

//     const isTaskId = await prisma.task.findFirst({
//       where : {id : taskId}
//     })

//     if(!isTaskId && !isTeamMemberId){
//       res.json({msg : "invailid taskId or TeamMemberId"})
//       return
//     }

//     const addTeamMemberToTask = await prisma.task.update({
//       where : {
//         id : taskId
//       },
//       data : {

//       }
//     })

//   }
// })

managerRouter.post("/approveNewSubTask",authMiddleware, async (req , res)=>{
  const {subTaskRequestId} = req.body;
  const {id} = req.body.user;

  try {
    const isValidRequsestId = await prisma.subTaskRequest.findFirst({
      where : {
        id : subTaskRequestId
      }
    })

    if(!isValidRequsestId){
      res.json({msg : "invalid sub task request"})
      return
    }

    const newSubTask = await prisma.subTask.create({
      data : {
        name : isValidRequsestId.name,
        status : "CREATED",
        task : {connect : {id : isValidRequsestId.taskId}},
        createdById : id,
        createdByRole : "MANAGER",
        deadLine : isValidRequsestId.deadline
      }
    })
    
    const updateSubTaskRequest = await prisma.subTaskRequest.update({
      where : {id : subTaskRequestId},
      data : {status : "APPROVED"}
    })

    res.json({msg : "subTaskRequest accepted"})
  }
  catch(e){
    console.log(e)
    res.json({msg : "internal server error"})
  }
})

managerRouter.post("/rejectNewSubTask",async (req , res)=>{
  const {subTaskRequestId} = req.body;

  try {
    const isValidRequsestId = await prisma.subTaskRequest.findFirst({
      where : {
        id : subTaskRequestId
      }
    })

    if(!isValidRequsestId){
      res.json({msg : "invalid sub task request"})
      return
    }

    const rejectSubTaskRequest = await prisma.subTaskRequest.update({
      where : {id : subTaskRequestId},
      data : {status : "REJECTED"}
    })

    res.json({msg : "subTaskRequest rejected"})
  }
  catch(e){
    console.log(e)
    res.json({msg : "internal server error"})
  }
})

managerRouter.put("/completeEvent", async (req , res)=>{
  const {eventId} = req.body;

  try {
    const isValidEvent = await prisma.event.findFirst({
      where : {
        id : eventId
      }
    })

    if(!isValidEvent){
      res.json({msg : "event does not exist"})
      return
    }

    const completedEvent = await prisma.event.update({
      where : {
        id : eventId
      },
      data : {
        status : "COMPLETED"
      }
    })
    res.json({msg : "event completed successfully"})
  }
  catch(e){
    console.log(e);
    res.json({msg : "internal server error"})
  }
})

managerRouter.get("/listEvents", async (req , res)=>{
  try {
    const events = await prisma.event.findMany({})

    res.json({events})
  }
  catch(e){
    console.log(e)
    res.json({msg : "internal server error"})
  }
})

managerRouter.get("/listClients", async (req , res)=>{
  try {
    const clients = await prisma.client.findMany({})

    res.json({clients})
  }
  catch(e){
    console.log(e)
    res.json({msg : "internal server error"})
  }
})

managerRouter.get("/listTeamMembers", async (req , res)=>{
  try {
    const teamMembers = await prisma.teamMember.findMany({})

    res.json({teamMembers})
  }
  catch(e){
    console.log(e)
    res.json({msg : "internal server error"})
  }
})

managerRouter.get("/listVendor", async (req , res)=>{
  try {
    const vendors = await prisma.vendor.findMany({})

    res.json({vendors})
  }
  catch(e){
    console.log(e)
    res.json({msg : "internal server error"})
  }
})

managerRouter.post("/messages",authMiddleware, async (req , res)=>{
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
              senderRole : "MANAGER"
          }
      })

      res.json({msg : "message sent successfully", newMessage})
  }
  catch(e){
      console.log(e)
      res.json({msg : "internal sever error"})
  }
})

export default managerRouter;