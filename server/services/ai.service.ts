import { type GenerateContentResponse, GoogleGenAI } from "@google/genai";
import { Chat } from "../models/chat.model.ts";
import { appError } from "../utils/appError.ts";
import { FAIL } from "../utils/httpStatus.ts";
import { roleModelInAdmin, roleModelInUser } from "../prompts/prompts.ts";
import type { RESPONSE_CHAT } from "../types/types.ts";
import { AiRepoFactory } from "../factories/factoriesRepo/AiRepo.factory.ts";



const ai = new GoogleGenAI({ apiKey: process.env.API_KEY_AI! })


export abstract class BaseChatService {
    abstract sendPromptToChat(userNewPrompt: string, id: string, roleUser: string): Promise<RESPONSE_CHAT>;
    abstract getMessagesChat(id: string): Promise<{ messages: any }>;
}

export class chatsService extends BaseChatService {
    async sendPromptToChat(userNewPrompt: string, id: string, roleUser: string): Promise<RESPONSE_CHAT> {
        const today = new Date().toISOString().slice(0, 10);
        const findChat = await AiRepoFactory.create().findChat(id)
        if (!findChat) {
            await AiRepoFactory.create().createChat({
                userId: id,
                messages: [],
                updatedAt: today,
            })
        }
        const history = findChat ? findChat.messages : [];
        history.push({ role: "user", parts: [{ text: userNewPrompt }] });
        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            config: { systemInstruction: roleUser == "admin" ? roleModelInAdmin : roleModelInUser },
            contents: history
        });
        if (!response.text) {
            throw appError(FAIL, "Check your internet connection.", 400);
        }
        history.push({ role: "model", parts: [{ text: response.text }] });
        const saveMessage = await AiRepoFactory.create().findOneAndUpdateChat({ "userId": id }, { $set: { messages: history }, updatedAt: today })
        return {
            userId: saveMessage?.userId,
            modelId: saveMessage?._id,
            responseModel: response.text,
            userPrompt: userNewPrompt
        }
    }
    async getMessagesChat(id: string): Promise<{ messages: any; }> {
        const messages = await Chat.findOne({ "userId": id });
        if (messages?.messages.length == 0) {
            throw appError(FAIL, "No previous conversations", 404);
        }
        return { messages }
    }
}
// export const deleteMessageChatService = async (idMessage: string, userId: string) => {
//     await connect();
//     const isValidObjectId = mongoose.Types.ObjectId.isValid(idMessage);
//     const targetId = isValidObjectId ? new mongoose.Types.ObjectId(idMessage) : idMessage;
//     const deleteMessage = await Chat.updateOne(
//         {
//             userId: userId,
//             $or: [
//                 { "messages._id": targetId },
//                 { "messages.parts._id": targetId }
//             ]
//         },
//         {
//             $pull: {
//                 messages: {
//                     $or: [
//                         { _id: targetId },
//                     ]
//                 }
//             }
//         }
//     );
//     console.log("Delete Result:", deleteMessage);
//     if (deleteMessage.modifiedCount === 0) {
//         throw appError(FAIL, "Message or Part not found with this ID.", 404);
//     }

//     return { deleteMessage };
// };