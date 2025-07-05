import mongoose, { Model, Schema, model, models } from "mongoose";

export interface NoteType extends Document  {
    title: string,
    description?: string,
    createdAt?: Date,
    userEmail: string
}

const noteSchema = new Schema<NoteType>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    userEmail: {
    type: String,
    required: true, // 👈 to link the note with the user
  },
}, {timestamps: true});

const Notes: Model<NoteType> = mongoose.models.Notes || mongoose.model<NoteType>("Notes", noteSchema);

export default Notes;