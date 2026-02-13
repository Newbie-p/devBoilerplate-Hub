import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/mongo.config.js";
import Framework from "../models/Framework.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing frameworks (optional)
    await Framework.deleteMany();

    // Insert initial frameworks
    await Framework.create([
      { name: "Node.js" },
      { name: "Next.js" },
      { name: "Django" },
    ]);

    console.log("Frameworks seeded successfully ✅");

    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedData();