

import db from "@/components/utils/db";
import PizzaData from "@/models/PizzaData";

export default async function handler(req, res) {
  await db.connect();

  if (req.method === "POST") {
    try {
      const { id } = req.body; // Get the ID from the request body

      const deletedPizza = await PizzaData.findByIdAndDelete(id);

      if (!deletedPizza) {
        return res.status(404).json({ success: false, message: "Pizza not found" });
      }

      res.status(200).json({ success: true, message: "Pizza deleted successfully" });
    } catch (error) {
      console.error("Error deleting pizza:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  await db.disconnect();
}
