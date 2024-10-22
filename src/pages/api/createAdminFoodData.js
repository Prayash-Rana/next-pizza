
import db from "@/components/utils/db";
import PizzaData from "@/models/PizzaData";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await db.connect();

    try {
      let pizza = new PizzaData({
        name: req.body.name,
        category: req.body.category,
        foodType: req.body.foodType,
        price: req.body.price,
        description: req.body.description,
        img: req.body.img,
      });

      await pizza.save();

      res.status(200).json({ success: true, data: pizza });
    } catch (error) {
      res.status(400).json({ status: false, message: "Internal server error" });
    }
  }

  db.disconnect();
}
