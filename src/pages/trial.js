import db from "@/components/utils/db";
import Orders from "@/models/Orders";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Connect to the database
    await db.connect();

    let data = req.body.order_data;
    // Add the order date to the beginning of the order data array
    data.unshift({ order_date: req.body.order_date });

    try {
      // Check if a user with the given email already exists
      let existUser = await Orders.findOne({ email: req.body.email });

      // If user does not exist, create a new order with the new user
      if (!existUser) {
        let newOrderWithNewUser = await Orders.create({
          email: req.body.email,
          order_data: [data],
        });

        res.status(201).json({
          success: true,
          message: "Order created successfully for new user",
          data: { order: newOrderWithNewUser },
        });
      }
      // If user exists, check if an order with the same date already exists
      else {
        let sameDateOrder = await Orders.findOne({
          email: req.body.email,
          "order_data.order_date": req.body.order_date,
        });

        // If no order with the same date exists, add the new order data
        if (!sameDateOrder) {
          const newOrderWithOldUser = await Orders.findOneAndUpdate(
            { email: req.body.email },
            { $push: { order_data: data } },
            { new: true } // Return the updated document
          );

          res.status(201).json({
            success: true,
            message: "Order created successfully for existing user",
            data: { order: newOrderWithOldUser },
          });
        }
        // If an order with the same date exists, update the existing order
        else {
          const updatedOrderWithSameDate = await Orders.findOneAndUpdate(
            { email: req.body.email, "order_data.order_date": req.body.order_date },
            { $set: { "order_data.$": data } }, // Update the specific order data by date
            { new: true } // Return the updated document
          );

          res.status(200).json({
            success: true,
            message: "Order updated successfully for existing user with the same date",
            data: { order: updatedOrderWithSameDate },
          });
        }
      }
    } catch (error) {
      console.error("Order processing error:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    } finally {
      // Disconnect from the database
      await db.disconnect();
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
