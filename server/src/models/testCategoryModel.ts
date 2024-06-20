import mongoose, { Document } from 'mongoose';

export interface ITestCategory extends Document {
  name: string;
}

const testCategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});

const TestCategory = mongoose.model<ITestCategory>('TestCategory', testCategorySchema);
export default TestCategory;