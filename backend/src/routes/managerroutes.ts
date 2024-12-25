import { Router, Request, Response } from "express";
import prisma from "../prisma";
import { sign } from "jsonwebtoken";
import { JWTSECRET } from "..";

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

    const vendor = await prisma.teamMember.create({
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

// managerRouter.post("/createEvent", async (req ,res)=>{
//   const {}
// })



export default managerRouter;