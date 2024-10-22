import db from "@/components/utils/db";
import Users from "@/models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await db.connect();

    try {
      // Check if the user exists
      const existUser = await Users.findOne({ email: req.body.email });

      if (!existUser) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      // Verify the password
      const passwordMatch = await bcrypt.compare(req.body.password, existUser.password);

      if (!passwordMatch) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }

      // Generate JWT token
      const authtoken = jwt.sign(
        { userId: existUser._id }, // Payload containing user ID
        process.env.JWT_SECRET, // Secret key from environment variable
        { expiresIn: "1h" } // Token expires in 1 hour
      );

      const isAdminVerify = existUser.isAdmin ;

      // Send a successful response with the token and user data
      res.status(200).json({
        success: true,
        message: "Logged in successfully",
        data: { authtoken, user: existUser , isAdmin:isAdminVerify},
      });
    } catch (error) {
      console.error("Error during authentication:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }

    await db.disconnect();
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
