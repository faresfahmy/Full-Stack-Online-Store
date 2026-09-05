import mongoose, { Schema } from "mongoose";
import type { Chats } from "../types/types.ts";


const chatSchema = new Schema<Chats>({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  messages: [
    {
      role: { 
        type: String, 
        required: true, 
        enum: ['user', 'model'] 
      },
      parts: [
        {
          text: { type: String, required: true }, 
        }
      ]
    }
  ]
}, { 
  timestamps: true 
});

export const Chat = mongoose.model<Chats>("Chat", chatSchema);