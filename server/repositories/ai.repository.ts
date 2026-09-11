import { Chat } from "../models/chat.model.ts";

interface AiRepositoryTypes {
    findChat: (idUser: string) => any;
    findOneAndUpdateChat: (idUser: { userId: string }, data: any) => any
    createChat: (dataChat: {
        userId: string,
        messages: any,
        updatedAt: string,
    }) => any
}

export class AiRepository implements AiRepositoryTypes {
    findChat(idUser: string) {
        return Chat.findOne({ "userId": idUser })
    }
    findOneAndUpdateChat(idUser: { userId: string }, data: any) {
        return Chat.findOneAndUpdate(idUser,data, { new: true });
    }
    createChat(dataChat: {
        userId: string,
        messages: any,
        updatedAt: string,
    }) {
        return Chat.create(dataChat)
    }
}
