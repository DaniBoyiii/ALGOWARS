const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// MongoDB connection string - replace with your actual connection string or use from .env
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Import the Problem model
// Assuming the model file is in the same directory structure as in your provided code
const Problem = require('./models/problemModel');

// Sample problems to add - you can modify this or load from a JSON file
const problemsToAdd = [
  {
    code: 'PROB001',
    name: 'Two Sum',
    isVisible: true,
    statement: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    description: 'You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    inputFormat: 'First line contains n, the size of the arraay.\nSecond line contains n space-separated integers.\nThird line contains the target sum.',
    outputFormat: 'Return the indices of the two numbers that add up to the target.',
    constraints: '2 <= nums.length <= 10^4\n-10^9 <= nums[i] <= 10^9\n-10^9 <= target <= 10^9',
    sample: [
      {
        input: '4\n2 7 11 15\n9',
        output: '0 1'
      },
      {
        input: '3\n3 2 4\n6',
        output: '1 2'
      }
    ],
    explanation: 'In the first example, nums[0] + nums[1] = 2 + 7 = 9, so we return [0, 1].',
    difficulty: 'Easy',
    problemSetter: 'John Doe',
    timeLimit: 1000,
    memoryLimit: 256,
    tags: ['Array', 'Hash Table'],
    editorial: 'We can use a hash map to store the elements we have seen so far and their indices...'
  },
  {
    code: 'PROB002',
    name: 'Merge Sort',
    isVisible: true,
    statement: 'Implement merge sort for an array of integers.',
    description: 'Merge sort is an efficient, stable sorting algorithm that uses the divide and conquer approach.',
    inputFormat: 'First line contains n, the size of the array.\nSecond line contains n space-separated integers.',
    outputFormat: 'Return the sorted array.',
    constraints: '1 <= n <= 10^5\n-10^9 <= arr[i] <= 10^9',
    sample: [
      {
        input: '5\n5 2 3 1 4',
        output: '1 2 3 4 5'
      }
    ],
    explanation: 'The array [5, 2, 3, 1, 4] is sorted to [1, 2, 3, 4, 5].',
    difficulty: 'Medium',
    problemSetter: 'Jane Smith',
    timeLimit: 2000,
    memoryLimit: 512,
    tags: ['Sorting', 'Divide and Conquer'],
    editorial: 'The merge sort algorithm divides the array into two halves, recursively sorts them, and then merges the sorted halves...'
  }
];

// Function to add problems to the database
async function addProblems(problems) {
  console.log(`Attempting to add ${problems.length} problems to the database...`);
  
  for (const problem of problems) {
    try {
      // Check if problem already exists
      const existingProblem = await Problem.findOne({ code: problem.code });
      
      if (existingProblem) {
        console.log(`Problem with code ${problem.code} already exists, skipping.`);
        continue;
      }
      
      // Create new problem document
      const newProblem = new Problem(problem);
      await newProblem.save();
      console.log(`Successfully added problem: ${problem.code} - ${problem.name}`);
    } catch (error) {
      console.error(`Error adding problem ${problem.code}:`, error.message);
    }
  }
}

// Function to load problems from a JSON file
function loadProblemsFromFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading problems from file:', error.message);
    return [];
  }
}

// Main execution
async function main() {
  // You can uncomment this to load problems from a JSON file instead of using the hardcoded array
  /*
  const filePath = path.join(__dirname, 'problems.json');
  const problemsFromFile = loadProblemsFromFile(filePath);
  
  if (problemsFromFile.length > 0) {
    await addProblems(problemsFromFile);
  } else {
    console.log('No problems loaded from file, using sample problems');
    await addProblems(problemsToAdd);
  }
  */
  
  // Using the hardcoded sample problems
  await addProblems(problemsToAdd);
  
  // Close the MongoDB connection
  mongoose.connection.close();
  console.log('MongoDB connection closed');
}

// Run the script
main().catch(err => {
  console.error('Error in main execution:', err);
  mongoose.connection.close();
});