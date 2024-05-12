import { Request, Response } from "express";
// Repositories
import ProductsRepository, { ProductType } from "../repositories/ProductsRepository";

class ProductController {
  // - PATTERNs
  async index(request: Request, response: Response) {
    const products = await ProductsRepository.findAll();

    return response.json(products);
  }

  async store(request: Request, response: Response) {
    try {
      const imagePath = request.file?.filename;
      const {
        name,
        description,
        price,
        category,
        // It is array, but is string
        ingredients
      } = request.body;

      if(!name) return response.status(400).json({ "error": "Name is required" });
      if(!price) return response.status(400).json({ "error": "Price is required" });

      const data: ProductType = {
        name,
        description,
        price: Number(price),
        category,
        image: imagePath,
        ingredients: ingredients ? JSON.parse(ingredients) : [],
      }

      const product = await ProductsRepository.create(data);

      return response.status(201).json(product);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ "error": error })
    }
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { name } = request.body;

    const productExists = await ProductsRepository.find(id);

    if(!productExists)
      return response.status(400).json({ "error": "Product not exists" });

    await ProductsRepository.update(id, { name });

    return response.sendStatus(204);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    if(!id) response.status(404).json({ "error": "Product not found" });

    const product = await ProductsRepository.find(id);

    return response.json(product);
  }

  async delete(request: Request, response: Response) {
      const { id } = request.params;

      if(!id) response.status(404).json({ "error": "Id is required" });

      await ProductsRepository.delete(id);

      return response.sendStatus(204);
  }

  // - OTHERs
  async showProducts(request: Request, response: Response) {
    const { categoryId } = request.params;

    if(!categoryId) response.status(404).json({ "error": "categoryId is required" });

    const product = await ProductsRepository.findByCategory(categoryId);

    return response.json(product);
  }
}

export default new ProductController();
