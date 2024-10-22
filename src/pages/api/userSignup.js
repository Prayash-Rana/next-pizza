import db from "@/components/utils/db";
import Users from "@/models/Users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  
  const salt = await bcrypt.genSalt(10);

  const securePass = await bcrypt.hash(req.body.password, salt);

  if (req.method === "POST") {
    await db.connect();
    try {
      const newUser = await Users.create({
        name: req.body.name,
        password: securePass,
        email: req.body.email,
        address: req.body.address,
      });

      

      // Generate JWT token
      const authtoken = jwt.sign(
        { userId: newUser._id }, // Payload containing user ID
        process.env.JWT_SECRET, // Secret key from environment variable
        { expiresIn: "1h" } // Token expires in 1 hour
      );

      const isAdminVerify = newUser.isAdmin ;

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: { authtoken, user: newUser, isAdmin:isAdminVerify },
      });


    } catch (error) {
      console.error('Error creating user:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }

  await db.disconnect()

}
