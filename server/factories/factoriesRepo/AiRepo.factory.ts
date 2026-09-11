import { AiRepository } from "../../repositories/ai.repository.ts";


export class AiRepoFactory{
    public static create():AiRepository{
        return new AiRepository()
    }
}