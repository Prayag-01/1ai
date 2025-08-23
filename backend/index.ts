
import express, { type Request, type Response } from "express";
import { CreateChatSchema } from "./types";
import { createComplition } from "./openrouter";

const app = express();
app.use(express.json());
const port = 3000;


app.post("/chat",(req:any,res:any):any =>{
  const {success,data} = CreateChatSchema.safeParse(req.body)

  if(!success){
    res.status(411).json({message: "Invalid inputs"})
    return
  }
  createComplition(data,success);
})
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
