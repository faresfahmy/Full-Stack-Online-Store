import { chatsService } from "../services/ai.service.ts";


export class ChatServiceFactory{
    public static create():chatsService{
        return  new chatsService(); 
    }
}