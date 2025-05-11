const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const User = require("./models/userModel.js"); // Adjust path as necessary

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

async function addAdminUser() {
  try {
    // Check if the admin user already exists
    const existingAdmin = await User.findOne({ username: "admin" });

    if (existingAdmin) {
      console.log("Admin user already exists!");
      return;
    }

    // Create a new admin user
    const adminUser = new User({
      userid: "admin001",  // Unique user ID for admin
      username: "admin",   // Username of admin
      name: "Admin User",  // Admin's full name
      email: "admin@example.com", // Admin's email
      gender: "Male",      // Admin's gender (optional)
      contact_number: "+1234567890", // Admin's contact number (optional)
      password: "adminpassword", // Password for admin (will be hashed)
      isAdmin: true,       // Set the user as an admin
    });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(12);
    adminUser.password = await bcrypt.hash(adminUser.password, salt);

    // Save the admin user to the database
    await adminUser.save();

    console.log("Admin user added successfully!");

  } catch (error) {
    console.error("Error adding admin user:", error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
}

// Run the function
addAdminUser();
