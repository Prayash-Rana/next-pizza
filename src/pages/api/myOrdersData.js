import db from "@/components/utils/db";
import Orders from "@/models/Orders";

export default async function handler(req, res) {
  await db.connect();

  if (req.method === "POST") {
    try {
      let findData = await Orders.findOne({ email: req.body.email });

      res.status(201).json({
        success: true,
        order_data: findData,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server error",
      });
    }
  }

  await db.disconnect();
}
