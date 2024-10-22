// File: pages/api/ordersData.js

import db from "@/components/utils/db";
import Orders from "@/models/Orders";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await db.connect();

    const { email, items_details, order_date } = req.body;

    try {
      // Find if the user already exists in the Orders collection
      let existingUser = await Orders.findOne({ email });

      if (!existingUser) {
        // If the user doesn't exist, create a new order for this user
        const newOrder = await Orders.create({
          email,
          order_data: [{ order_date, items: items_details }],
        });

        res.status(201).json({
          success: true,
          message: "Order created successfully",
          data: { order: newOrder },
        });
      } else {
        // If the user exists, check if there's an order on the same date
        const existingDateOrder = existingUser.order_data.find(
          (entry) => entry.order_date === order_date
        );

        if (existingDateOrder) {
          // If an order exists on the same date, add new items to that date
          existingDateOrder.items.push(...items_details);

          // Logging to confirm the correct order_date and items are being pushed
          console.log("Existing date found. Updating items:", existingDateOrder.items);

          await existingUser.save();

          res.status(200).json({
            success: true,
            message: "Order updated successfully",
            data: { order: existingUser },
          });
        } else {
          // If no order exists on the same date, create a new date entry in order_data
          const updatedOrder = await Orders.findOneAndUpdate(
            { email },
            { $push: { order_data: { order_date, items: items_details } } },
            { new: true } // Return the updated document
          );

          res.status(201).json({
            success: true,
            message: "Order created successfully",
            data: { order: updatedOrder },
          });
        }
      }
    } catch (error) {
      console.error("Error processing order:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    } finally {
      await db.disconnect();
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
