import React, { useState } from "react";
import Header from "../../components/header/Header";

const AddProblem = () => {
  const [problemData, setProblemData] = useState({
    code: "",
    name: "",
    description: "",
    statement: "",
    inputFormat: "",
    outputFormat: "",
    difficulty: "Medium",
    tags: [],
    isVisible: true,
    sample: [],
    timeLimit: "2000",
    memoryLimit: "512",
    constraints: "",
    problemSetter: "",
    explanation: "",
    editorial: "",
  });

  const [sampleInput, setSampleInput] = useState("");
  const [sampleOutput, setSampleOutput] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProblemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTagInputChange = (e) => setTagInput(e.target.value);

  const handleTagInputKeyDown = (e) => {
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !problemData.tags.includes(newTag)) {
      setProblemData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, newTag],
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setProblemData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const sample = [
        {
          input: sampleInput,
          output: sampleOutput,
        },
      ];

      const finalProblemData = {
        ...problemData,
        sample,
        tags: [...problemData.tags],
        timeLimit: Number(problemData.timeLimit), // in ms
        memoryLimit: Number(problemData.memoryLimit), // in MB
      };

      const response = await fetch(
        process.env.REACT_APP_BASE_URL + "/api/problems/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalProblemData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add problem");
      }

      setSuccessMessage("Problem successfully added!");

      // Reset form
      setProblemData({
        code: "",
        name: "",
        description: "",
        statement: "",
        inputFormat: "",
        outputFormat: "",
        difficulty: "Medium",
        tags: [],
        isVisible: true,
        timeLimit: "2000",
        memoryLimit: "512",
        constraints: "",
        problemSetter: "",
        explanation: "",
        editorial: "",
      });
      setSampleInput("");
      setSampleOutput("");
      window.scrollTo({ top: 0, behavior: "smooth" });

    } catch (error) {
      setErrorMessage(error.message || "Failed to add problem. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="main-head"></div>
      <Header />
      <div className="problem-page">
        <div className="add-problem-container">
          <h2>Add a New Problem</h2>

          {successMessage && (
            <div className="success-message">
              <span className="success-icon">✓</span>
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="error-message">
              <span className="error-icon">!</span>
              {errorMessage}
            </div>
          )}

          <form className="add-problem-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="code">Problem Code</label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  value={problemData.code}
                  onChange={handleChange}
                  required
                  placeholder="e.g., PROB001"
                />
              </div>

              <div className="form-group">
                <label htmlFor="problemSetter">Problem Setter</label>
                <input
                  type="text"
                  id="problemSetter"
                  name="problemSetter"
                  value={problemData.problemSetter}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="name">Problem Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={problemData.name}
                onChange={handleChange}
                required
                placeholder="Enter a concise, descriptive problem name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Brief Description</label>
              <textarea
                id="description"
                name="description"
                value={problemData.description}
                onChange={handleChange}
                required
                placeholder="A short summary of the problem"
              />
            </div>

            <div className="form-group">
              <label htmlFor="statement">Problem Statement</label>
              <textarea
                id="statement"
                name="statement"
                value={problemData.statement}
                onChange={handleChange}
                required
                placeholder="Detailed explanation of the problem"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="inputFormat">Input Format</label>
                <textarea
                  id="inputFormat"
                  name="inputFormat"
                  value={problemData.inputFormat}
                  onChange={handleChange}
                  required
                  placeholder="Describe the input format"
                />
              </div>

              <div className="form-group">
                <label htmlFor="outputFormat">Output Format</label>
                <textarea
                  id="outputFormat"
                  name="outputFormat"
                  value={problemData.outputFormat}
                  onChange={handleChange}
                  required
                  placeholder="Describe the output format"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="constraints">Constraints</label>
              <textarea
                id="constraints"
                name="constraints"
                value={problemData.constraints}
                onChange={handleChange}
                placeholder="List any constraints (e.g., time limits, input ranges)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="explanation">Explanation</label>
              <textarea
                id="explanation"
                name="explanation"
                value={problemData.explanation}
                onChange={handleChange}
                placeholder="Explanation of the solution"
              />
            </div>

            <div className="form-group">
              <label htmlFor="editorial">Editorial</label>
              <textarea
                id="editorial"
                name="editorial"
                value={problemData.editorial}
                onChange={handleChange}
                placeholder="Editorial for the problem"
              />
            </div>

            <div className="form-group">
              <label>Difficulty Level</label>
              <select
                name="difficulty"
                value={problemData.difficulty}
                onChange={handleChange}
                className="select-dropdown"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="timeLimit">Time Limit (ms)</label>
                <input
                  type="number"
                  id="timeLimit"
                  name="timeLimit"
                  value={problemData.timeLimit}
                  onChange={handleChange}
                  min="100"
                  step="100"
                  placeholder="Time limit in milliseconds"
                />
              </div>

              <div className="form-group">
                <label htmlFor="memoryLimit">Memory Limit (MB)</label>
                <input
                  type="number"
                  id="memoryLimit"
                  name="memoryLimit"
                  value={problemData.memoryLimit}
                  onChange={handleChange}
                  min="1"
                  placeholder="Memory limit in MB"
                />
              </div>
            </div>

            {/* Sample Input / Output */}
            <div className="form-group">
              <label>Sample Input/Output</label>
              <textarea
                value={sampleInput}
                onChange={(e) => setSampleInput(e.target.value)}
                placeholder="Input for the sample test case"
              />
              <textarea
                value={sampleOutput}
                onChange={(e) => setSampleOutput(e.target.value)}
                placeholder="Expected output for the sample test case"
              />
            </div>

            {/* Tags */}
            <div className="form-group">
              <label>Tags</label>
              <div className="tags-container">
                {problemData.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    {tag}{" "}
                    <button type="button" onClick={() => removeTag(tag)}>
                      x
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={tagInput}
                  onChange={handleTagInputChange}
                  onKeyDown={handleTagInputKeyDown}
                  placeholder="Press Enter to add tag"
                />
              </div>
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={problemData.isVisible}
                  onChange={() =>
                    setProblemData((prev) => ({
                      ...prev,
                      isVisible: !prev.isVisible,
                    }))
                  }
                />
                Visible
              </label>
            </div>

            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Add Problem"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProblem;
