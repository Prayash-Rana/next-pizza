import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    order_data: [
      {
        order_date: { type: String, required: true },
        items: [{ type: Object, required: true }]
      }
    ]
   
  },
  {
    timestamps: true,
  }
);

const Orders = mongoose.models.Orders || mongoose.model("Orders", orderSchema);

export default Orders;
