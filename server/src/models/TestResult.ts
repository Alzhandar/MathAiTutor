import mongoose, { Document, Schema } from 'mongoose';

export interface ITestResult extends Document {
  user: mongoose.Types.ObjectId;
  category: mongoose.Types.ObjectId;
  score: number;
  answers: {
    question: mongoose.Types.ObjectId;
    answer: string;
    isCorrect: boolean;
  }[];
}

const testResultSchema = new Schema<ITestResult>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: Schema.Types.ObjectId, ref: 'TestCategory', required: true },
  score: { type: Number, required: true },
  answers: [
    {
      question: { type: Schema.Types.ObjectId, ref: 'TestQuestion', required: true },
      answer: { type: String, required: true },
      isCorrect: { type: Boolean, required: true }
    }
  ]
}, { timestamps: true });

const TestResult = mongoose.model<ITestResult>('TestResult', testResultSchema);

export default TestResult;
