import { model, Schema } from "mongoose";

export const Order = model("Order", new Schema({
  table: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: "WAITING",
    enum: ["WAITING", "IN_PRODUCTION", "DONE"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  products: {
    type: [{
      product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product"
      },
      quantity: {
        type: Number,
        required: true
      },
    }],
    required: true
  },
}));


