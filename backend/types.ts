import {z} from "zod";

const MAX_INPUT_TOKENS = 1000;

export const CreateChatSchema = z.object({
    conversetionId: z.uuid().optional(),
    message: z.string().max(MAX_INPUT_TOKENS),
})

export interface Message{
    content:string,
    role:Role;
}[]

export enum Role {Agent = "assistant" ,User = "user"}