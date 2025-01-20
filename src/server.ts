import express from "express";

const app = express();
const port = 3000;

app.get("/health",(req,res)=>{
  res.status(200).json({message:"All is running A-Ok 👌"})
})

app.listen(port, ()=>{
  console.log(`🏃 App is running on port ${port}`)
})
