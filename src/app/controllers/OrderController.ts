import { Request, Response } from "express";
// Repositories
import OrdersRepository, { OrderType, ProductOrderType } from "../repositories/OrdersRepository";

class OrderController {
  async index(request: Request, response: Response) {
    const orders = await OrdersRepository.findAll();

    return response.json(orders);
  }

  async store(request: Request, response: Response) {
    const {
      table,
      products
    } = request.body;

    if(!table) return response.status(400).json({ "error": "Table is required" });
    if(!products) return response.status(400).json({ "error": "Products is required" });

    const newOrder: OrderType = {
      table,
      products: products ? products.map((product: ProductOrderType) => ({ ...product, quantity: Number(product.quantity) })) : []
    }

    const order = await OrdersRepository.create(newOrder);

    return response.status(201).json(order);
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { status } = request.body;

    const orderExists = await OrdersRepository.find(id);

    if(!orderExists)
      return response.status(400).json({ "error": "Order not exists" });

    // TODO: improve this
    if(!["WAITING", "IN_PRODUCTION", "DONE"].includes(status))
      return response.status(400).json({ "error": "Status should be one of these: WAITING, IN_PRODUCTION or DONE" });

    await OrdersRepository.update(id, { status });

    return response.sendStatus(204);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;

    if(!id) response.status(404).json({ "error": "Order not found" });

    const order = await OrdersRepository.find(id);

    return response.json(order);
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    if(!id) response.status(404).json({ "error": "Id is required" });

    await OrdersRepository.delete(id);

    return response.sendStatus(204);
  }
}

export default new OrderController();
