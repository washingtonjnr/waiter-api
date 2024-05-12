import { Product } from "../models/Product";

type IngredientType = {
  name: string,
  icon: string,
}

export type ProductType = {
  name: string,
  description?: string,
  image?: string,
  price: number,
  category: string,
  ingredients?: IngredientType[],
}

class ProductsRepository {
  async findAll() {
    return await Product.find();
  }

  async find(id: string) {
    return await Product.findById(id);
  }

  async findByName(name: string) {
    return await Product.findOne({ name });
  }

  async findByCategory(categoryId: string) {
    return await Product.find().where("category").equals(categoryId);
  }

  async create(product: ProductType) {
    return await Product.create(product);
  }

  async update(
    id: string,
    data: { name: string },
  ) {
    return await Product.findByIdAndUpdate(id, data);
  }

  async delete(id: string) {
    return await Product.findByIdAndDelete(id);
  }
}

export default new ProductsRepository();
