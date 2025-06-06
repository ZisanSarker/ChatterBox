import { Schema, model, Document } from 'mongoose';

export interface IMessage extends Document {
  username: string;
  text: string;
  createdAt: Date;
}

const messageSchema = new Schema<IMessage>({
  username: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() },
});

export default model<IMessage>('Message', messageSchema);
