// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import db from "@/components/utils/db";
import PizzaData from "@/models/PizzaData";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await db.connect(); // Connect to the database
      
      const data = await PizzaData.find({}); // Fetch all pizza data
      
      res.status(200).json({ data });
    } 
    catch (error) {
      console.error("Error fetching pizza data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    } 
    finally {
      await db.disconnect(); // Disconnect from the database
    }
  } else {
    // Handle unsupported HTTP methods
    
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}



