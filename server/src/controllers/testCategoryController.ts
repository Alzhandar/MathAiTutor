import { Request, Response } from 'express';
import TestCategory from '../models/testCategoryModel';

export const createTestCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const categoryExists = await TestCategory.findOne({ name });
    if (categoryExists) {
      return res.status(400).json({ message: 'Category already exists' });
    }
    const newCategory = new TestCategory({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getTestCategories = async (req: Request, res: Response) => {
  try {
    const categories = await TestCategory.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};