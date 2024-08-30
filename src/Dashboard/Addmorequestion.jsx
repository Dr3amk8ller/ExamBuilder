import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/ExamForm.css";
import "../css/Addmorequestion.css";

const Addmorequestion = ({ title, onClose, onQuestionAdded }) => {
  const [questionType, setQuestionType] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: ["", ""],
    correctAnswer: "",
    correctAnswerIndex: "",
    answerDescription: "",
    questionImage: null,
    optionImages: [],
  });
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Data = reader.result.split(",")[1];
      };
      reader.readAsDataURL(acceptedFiles[0]);
    },
  });

  const fetchTotalQuestions = async () => {
    const token = localStorage.getItem("token");
    // const payload = {
    //   body: JSON.stringify({ quizTitle: title }),
    //   headers: {
    //     Authorization: token,
    //     "Content-Type": "application/json",
    //   },
    // };
    const payload = {
      quizTitle: title   
   };

    try {
      const response = await axios.post(
        "https://598sj81enf.execute-api.ap-south-1.amazonaws.com/v1/quizzCoutMCQ_M",
        payload,{
          headers: {
            "Authorization": token,
            "Content-Type": "application/json"
          }
        }
      );
      console.log("Question count API response:", response.data);
      const totalQuizzCount = (response.data).totalQuizzCount;
      setTotalQuestions(totalQuizzCount);
    } catch (error) {
      console.error("Error fetching question count:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTotalQuestions();
  }, [title]);

  const handleQuestionTypeChange = (event) => {
    setQuestionType(event.target.value);
  };

  const handleOptionChange = (index, event) => {
    const { value } = event.target;
    if (value.length <= 150) {
      const updatedOptions = [...currentQuestion.options];
      updatedOptions[index] = value;
      setCurrentQuestion({
        ...currentQuestion,
        options: updatedOptions,
      });
    }
  };

  const handleCorrectAnswerChange = (e) => {
    const selectedOptionIndex = parseInt(e.target.value, 10);
    setCurrentQuestion((prevState) => ({
      ...prevState,
      correctAnswerIndex: selectedOptionIndex,
      correctAnswer: prevState.options[selectedOptionIndex - 1],
    }));
  };

  const handleAddOption = () => {
    setCurrentQuestion((prevState) => ({
      ...prevState,
      options: [...prevState.options, ""],
    }));
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = currentQuestion.options.filter(
      (_, optionIndex) => optionIndex !== index
    );
    setCurrentQuestion({
      ...currentQuestion,
      options: updatedOptions,
    });
  };

  const validateOptions = () => {
    let validationErrors = {};
    currentQuestion.options.forEach((option, index) => {
      if (!option.trim()) {
        validationErrors[`option${index + 1}`] = `Option ${index + 1} is required`;
      }
    });
    return validationErrors;
  };

  const handleAddQuestion = async () => {
    let validationErrors = {};

    // Validation for MCQ
    if (questionType === "MCQ") {
      if (!currentQuestion.question.trim()) {
        validationErrors.question = "Question is required";
      }
      const optionErrors = validateOptions();
      validationErrors = { ...validationErrors, ...optionErrors };
      if (!currentQuestion.correctAnswerIndex) {
        validationErrors.correctAnswer = "Correct answer is required";
      }
    }

    // Validation for Subjective
    if (questionType === "Subjective") {
      if (!currentQuestion.question.trim()) {
        validationErrors.question = "Question is required";
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const mapOptions = (options) => {
        return options.map((option) => {
          return {
            answer: option,
          };
        });
      };
      let payload;
      if (questionType === "MCQ") {
        const questionData = {
          question: currentQuestion.question,
          options: mapOptions(currentQuestion.options),
          correctAnswer:
            currentQuestion.options.indexOf(currentQuestion.correctAnswer) + 1,
          description: currentQuestion.answerDescription || "",
        };
        const apiUrl="https://598sj81enf.execute-api.ap-south-1.amazonaws.com/v1/quizzQuestionService_M";
        payload = {
          quizTitle: title,
          mcqQuizz: [questionData],  
        };
        const addQuestionResponse = await axios.post(
          apiUrl,payload,{
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },  
          }
        );
        console.log("Question API response:", addQuestionResponse.data);
        toast.success("Question saved successfully!");
      } else if (questionType === "Subjective") {
        const questionData = {
          question: currentQuestion.question || "",
          answer: currentQuestion.answerDescription || "",
        };

        const apiUrl="https://598sj81enf.execute-api.ap-south-1.amazonaws.com/v1/quizzDiscriptiveQuestionService_M";
        payload = {
            quizTitle: title,
            descriptiveQuizz: [questionData],
        };
       
        const addQuestionResponse = await axios.post(
          apiUrl,payload,{
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }

        );
        console.log("Descriptive question API response:", addQuestionResponse.data);
        toast.success("Descriptive question saved successfully!");
      }

      setQuestions([...questions, currentQuestion]);
      setCurrentQuestion({
        question: "",
        options: ["", ""],
        correctAnswer: "",
        answerDescription: "",
        questionImage: null,
        optionImages: [],
      });

      fetchTotalQuestions();
      onQuestionAdded();
      toast.success("Question saved successfully!");
    } catch (error) {
      toast.error("Failed to save question. Please try again.");
    } finally {
      localStorage.removeItem("images");
      setLoading(false);
    }
  };

  return (
    <div className="addmorequestion-container">
      <div className="overlay" onClick={onClose}></div>
      <div className="addmorequestion-content">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <ToastContainer />
        <div className="exam-form">
          <h2 className="Examtitle">Exam Form</h2>
          <p>Title: {title}</p>
          <form>
            <div className="form-group">
              <select
                className="form-control"
                id="questionType"
                name="questionType"
                value={questionType}
                onChange={handleQuestionTypeChange}
              >
                <option value="">Select Question Type</option>
                <option value="MCQ">Multiple Choice Questions</option>
                <option value="Subjective">Subjective</option>
              </select>
            </div>
          </form>
          {/* MCQ Section */}
          {questionType === "MCQ" && (
            <div className="mcq-section">
              <h3>Add MCQ Question</h3>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Question"
                  aria-label="Question"
                  id="question"
                  name="question"
                  value={currentQuestion.question}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      question: e.target.value,
                    })
                  }
                />
                {errors.question && <p className="error">{errors.question}</p>}
              </div>
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Option ${index + 1}`}
                    aria-label={`Option ${index + 1}`}
                    id={`option${index + 1}`}
                    name={`option${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e)}
                  />
                  {errors[`option${index + 1}`] && (
                    <p className="error-message">{errors[`option${index + 1}`]}</p>
                  )}
                  {index >= 2 && (
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => handleRemoveOption(index)}
                      // onClick={() => handleRemoveOption(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <div className="form-group">
                <select
                  id="correctAnswer"
                  className="form-control"
                  value={currentQuestion.correctAnswerIndex}
                  onChange={handleCorrectAnswerChange}
                >
                  <option value="" disabled={!currentQuestion.options.length}>
                    Select correct answer
                  </option>
                  {currentQuestion.options.map((option, index) => (
                    <option key={index} value={index + 1}>
                      {`Option ${index + 1}: ${option}`}
                    </option>
                  ))}
                </select>
                {errors.correctAnswer && (
                  <p className="error-message">{errors.correctAnswer}</p>
                )}
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  id="answerDescription"
                  placeholder="Enter answer description (optional)"
                  aria-label="Enter answer description"
                  name="answerDescription"
                  value={currentQuestion.answerDescription}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      answerDescription: e.target.value,
                    })
                  }
                />
              </div>
              <div className="button-group">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleAddOption}
                >
                  Add Option
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddQuestion}
                  disabled={loading || currentQuestion.question === ""}
                >
                  {loading ? "Saving..." : "Save Question"}
                </button>
              </div>
            </div>
          )}

          {/* Subjective Section */}
          {questionType === "Subjective" && (
            <div className="subjective-section">
              <h3>Add Subjective Question</h3>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Question"
                  aria-label="Question"
                  id="question"
                  name="question"
                  value={currentQuestion.question}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      question: e.target.value,
                    })
                  }
                />
                {errors.question && <p className="error">{errors.question}</p>}
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  id="answerDescription"
                  placeholder="Enter answer (optional)"
                  aria-label="Enter answer description"
                  name="answerDescription"
                  value={currentQuestion.answerDescription}
                  onChange={(e) =>
                    setCurrentQuestion({
                      ...currentQuestion,
                      answerDescription: e.target.value,
                    })
                  }
                />
              </div>
              <div className="button-group">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddQuestion}
                  disabled={loading || currentQuestion.question === ""}
                >
                  {loading ? "Saving..." : "Save Question"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Addmorequestion;
