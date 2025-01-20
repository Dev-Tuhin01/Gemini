import {Request, Response} from "express";

const health = (_req:Request,res:Response)=>{
  res.status(200).json({message:"All is running A-Ok 👌"})
};

export default health;
