import { Request, Response } from "express";
// Repositories
import CategoriesRepository from "../repositories/CategoriesRepository";

class CategoryController {
  async index(request: Request, response: Response) {
    const categories = await CategoriesRepository.findAll();

    return response.json(categories);
  }

  async store(request: Request, response: Response) {
    const {
      name,
      icon
    } = request.body;

    const contactExists = await CategoriesRepository.findByName(name);

    if(!name) return response.status(400).json({ "error": "Name is required" });
    if(contactExists) return response.status(400).json({ "error": "Category is already exists" });

    const contact = await CategoriesRepository.create(name, icon);

    return response.status(201).json(contact);
  }

  async update(request: Request, response: Response) {
      const { id } = request.params;
      const {
          name,
      } = request.body;

      const categotyExists = await CategoriesRepository.find(id);

      if(!categotyExists)
          return response.status(400).json({ "error": "Category not exists" });

      await CategoriesRepository.update(id, { name });

      return response.sendStatus(204);
  }

  async show(request: Request, response: Response) {
      const { id } = request.params;

      if(!id) response.status(404).json({ "error": "Category not found" });

      const category = await CategoriesRepository.find(id);

      return response.json(category);
  }

  async delete(request: Request, response: Response) {
      const { id } = request.params;

      if(!id) response.status(404).json({ "error": "Id is required" });

      await CategoriesRepository.delete(id);

      return response.sendStatus(204);
  }
}

export default new CategoryController();
