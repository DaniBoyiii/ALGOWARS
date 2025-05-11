// server.js or routes/problems.js
const express = require('express');
const mongoose = require('mongoose');
const Problem = require('../models/problemModel'); // Adjust path if necessary

const router = express.Router();

// Route to add new problem
router.post('/add', async (req, res) => {
    const {
      code,
      name,
      statement,
      description,
      inputFormat,
      outputFormat,
      constraints,
      sample,
      difficulty,
      tags,
      editorial,
      explanation,        // ✅ Add this
      timeLimit,          // ✅ Add this
      memoryLimit,        // ✅ Add this
      problemSetter,      // ✅ Add this
      isVisible           // ✅ Add this
    } = req.body;
  
    try {
      const existingProblem = await Problem.findOne({ code });
      if (existingProblem) {
        return res.status(400).json({ message: `Problem with code ${code} already exists.` });
      }
  
      const newProblem = new Problem({
        code,
        name,
        statement,
        description,
        inputFormat,
        outputFormat,
        constraints,
        sample,
        difficulty,
        tags,
        editorial,
        explanation,       // ✅ Now included
        timeLimit,         // ✅ Now included
        memoryLimit,       // ✅ Now included
        problemSetter,     // ✅ Now included
        isVisible          // ✅ Now included
      });
  
      await newProblem.save();
      res.status(201).json({ message: `Problem ${name} added successfully!` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding problem.', error: error.message });
    }
  });
  

module.exports = router;
