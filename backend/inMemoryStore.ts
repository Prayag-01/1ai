import type { Message } from "./types";

const EVECTION_TIME = 5 * 60 * 1000;
const EVECTION_CLOCK_TIME = 5 * 60 * 1000;


export class InMemoryStore {

    private static store:InMemoryStore;

    private store:Record<string,{
        messages: Message[],
        evictionTime: number;
    }>;

    private clock: NodeJS.Timeout;

    private constructor(){
     this.store = {};
     this.clock = setInterval(()=>{
        Object.entries(this.store).forEach(([key,{evictionTime}])=>{
           if(evictionTime < Date.now()){
               delete this.store[key];
           }
        });
     },EVECTION_CLOCK_TIME)
    }

    public destory(){
        clearInterval(this.clock)
    }

    static getInstance(){
        if(!InMemoryStore.store){
            InMemoryStore.store = new InMemoryStore();
        }
        return this.store;
    }

    add(conversetionId:string,message:Message){
        if(!this.store[conversetionId]){
            this.store[conversetionId] = {
                messages:[],
                evictionTime: Date.now() + EVECTION_TIME
            }
        }
        this.store[conversetionId].messages.push(message);
    }
}