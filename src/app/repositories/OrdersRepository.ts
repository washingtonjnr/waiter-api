import { Order } from "../models/Order";

export type ProductOrderType = {
  product: string,
  quantity: string,
}

export type OrderType = {
  table: string,
  products?: ProductOrderType[],
}

export type UpdateOrderType = {
  table?: string,
  status: "WAITING" | "IN_PRODUCTION" | "DONE"
}

class OrdersRepository {
  async findAll() {
    return await Order.find().sort({ createAt: 1 }).populate("products.product");
  }

  async find(id: string) {
    return await Order.findById(id);
  }

  async findByName(name: string) {
    return await Order.findOne({ name });
  }

  async create(order: OrderType) {
    return await Order.create(order);
  }

  async update(id: string, updated: UpdateOrderType) {
    return await Order.findByIdAndUpdate(id, updated);
  }

  async delete(id: string) {
    return await Order.findByIdAndDelete(id);
  }
}

export default new OrdersRepository();
