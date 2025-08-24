
import express from "express";
import { CreateChatSchema, Role } from "./types";
import { createComplition } from "./openrouter";
import { InMemoryStore } from "./inMemoryStore";

const app = express();
app.use(express.json());
const port = 3000;


app.post("/chat",async (req:any,res:any)=>{

  
  const {success,data} = CreateChatSchema.safeParse(req.body)

  const conversetionId = data?.conversetionId ?? Bun.randomUUIDv7()
  if(!data?.conversetionId){

  }

  if(!success){
    res.status(411).json({message: "Invalid inputs"})
    return
  }

  let existingMessages = InMemoryStore.getInstance().get(conversetionId);
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Connection', 'keep-alive'); 
  let message ="";
  await createComplition([...existingMessages,{
    role: Role.User,
    content:data.message
  }],data.model,(chunk:string)=>{
    message += chunk;
    res.write(chunk)
  });
  res.end()

  InMemoryStore.getInstance().add(conversetionId,{
    role: Role.User,
    content:data.message
  })

  InMemoryStore.getInstance().add(conversetionId,{
    role: Role.Agent,
    content:data.message
  })
})
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
