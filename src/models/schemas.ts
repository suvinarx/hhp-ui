import mongoose, { Document, Model } from 'mongoose';

interface IContact extends Document {
    name: string;
    email: string;
    message: string;
    createdAt: Date;
}

interface IFeedback extends Document {
    name: string;
    email: string;
    contactNo: string;
    message: string;
    createdAt: Date;
}

const contactSchema = new mongoose.Schema<IContact>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const feedbackSchema = new mongoose.Schema<IFeedback>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    contactNo: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export const Contact: Model<IContact> = mongoose.models.Contact || mongoose.model<IContact>('Contact', contactSchema);
export const Feedback: Model<IFeedback> = mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', feedbackSchema);