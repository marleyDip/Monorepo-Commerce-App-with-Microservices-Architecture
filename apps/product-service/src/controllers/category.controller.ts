import { prisma, Prisma } from "@repo/product-db";
import { Request, Response } from "express";

// Create Category
export const createCategory = async (req: Request, res: Response) => {
  //console.log("Headers:", req.headers);
  //console.log("Incoming Body:", req.body);

  // if (!req.body || Object.keys(req.body).length === 0) {
  //   return res
  //     .status(400)
  //     .json({ message: "Request body is empty or invalid" });
  // }

  const data: Prisma.CategoryCreateInput = req.body;

  // Check if a category with the same slug already exists
  const existingCategorySlug = await prisma.category.findUnique({
    where: { slug: data.slug },
  });

  if (existingCategorySlug) {
    return res.status(400).json({
      message:
        "A category with this slug already exists. Please choose a different slug.",
    });
  }

  // create new category in database
  const category = await prisma.category.create({ data });
  res.status(201).json(category);
};

// Update Category
export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: Prisma.CategoryUpdateInput = req.body;

  const updateCategory = await prisma.category.update({
    where: { id: Number(id) },
    data,
  });

  return res.status(200).json(updateCategory);
};

// Delete Category
export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  const existingDeleteCategory = await prisma.category.findUnique({
    where: { id: Number(id) },
  });

  if (!existingDeleteCategory) {
    return res
      .status(400)
      .json({ message: "Category not found or already delete from category" });
  }

  const deleteCategory = await prisma.category.delete({
    where: { id: Number(id) },
  });

  return res
    .status(200)
    .json({ message: "Category deleted successfully!", deleteCategory });
};

// Get All Category
export const getCategories = async (req: Request, res: Response) => {
  const categories = await prisma.category.findMany();

  return res.status(200).json(categories);
};
