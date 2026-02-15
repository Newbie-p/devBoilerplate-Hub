import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/mongo.config.js";
import Framework from "../models/Framework.js";
import Category from "../models/Category.js";
import Snippet from "../models/Snippet.js";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    await Framework.deleteMany();
    await Category.deleteMany();
    await Snippet.deleteMany();

    const nodeFramework = await Framework.create({ name: "Node.js" });

    const databaseCategory = await Category.create({ name: "Database" });

    await Snippet.create({
      title: "MongoDB Connection",
      framework: nodeFramework._id,
      category: databaseCategory._id,
      shortDescription: "Connect Express app to MongoDB using Mongoose",
      installCommand: "npm install mongoose dotenv",
      code: "mongoose.connect(process.env.MONGO_URI);",
      explanation: "This connects your Express app to MongoDB using Mongoose.",
      documentationUrl: "https://mongoosejs.com/docs/",
      tags: ["mongodb", "database", "mongoose"]
    });

    console.log("Database seeded successfully ✅");
    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedData();
