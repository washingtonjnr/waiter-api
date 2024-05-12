import { Category } from "../models/Category";

class CategoriesRepository {
  async findAll() {
    return await Category.find();
  }

  async find(id: string) {
    return await Category.findById(id);
  }

  async findByName(name: string) {
    return await Category.findOne({ name });
  }

  async create(name: string, icon: string) {
    return await Category.create({ name, icon });
  }

  async update(
    id: string,
    data: { name: string },
  ) {
    return await Category.findByIdAndDelete(id, data);
  }

  async delete(id: string) {
    return await Category.findByIdAndDelete(id);
  }
}

export default new CategoriesRepository();
