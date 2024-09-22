

import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; // Axios for making HTTP requests

const ExamDetailsPage = () => {
  const { quizzId } = useParams(); // This retrieves the quizzId from the URL
  const location = useLocation();

  // Retrieve the exam object from the passed state, if available
  const examFromState = location.state?.quiz;

  // Local state to store exam details fetched from API
  const [exam, setExam] = useState(examFromState || null);
  const [students, setStudents] = useState([]); // To store student details
  const [loading, setLoading] = useState(!examFromState); // Show loading initially if exam isn't passed in state
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const [pageSize] = useState(10); // Default page size

  // Fetch the exam and student details from API if not passed via state
  useEffect(() => {
    if (!exam) {
      setLoading(true);
      axios
        .post(
          "https://598sj81enf.execute-api.ap-south-1.amazonaws.com/v1/studentsearch_details",
          {
            email: "hupino.apubej@rungel.net", // Replace this with the actual quiz creator's email
            quizTitle: "Math Quiz", // Replace this with the actual quiz title
            page: currentPage, // Pagination support
            pageSize: pageSize,
          }
        )
        .then((response) => {
          setExam(response.data); // Set the fetched exam details
          setStudents(response.data.students); // Store students in state
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching exam details:", error);
          setError("Failed to load exam details. Please try again later.");
          setLoading(false);
        });
    }
  }, [quizzId, exam, currentPage, pageSize]);

  // Handle next/previous page for pagination (optional)
  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePreviousPage = () =>
    setCurrentPage((prev) => Math.max(prev - 1, 1));

  // Render loading, error, or exam details
  return (
    <div className="exam-details">
      <h1>Exam Details for Quiz ID: {quizzId}</h1>

      {loading && <p>Loading exam details...</p>}
      {error && <p>{error}</p>}
      {exam && (
        <div>
          <p>Quiz Title: {exam.quizTitle}</p>
          <p>Current Page: {exam.currentPage}</p>
          <p>Page Size: {exam.pageSize}</p>
          <h3>Students who took the quiz:</h3>
          <ul>
            {students.length > 0 ? (
              students.map((student) => (
                <li key={student.studentid}>
                  <p>Name: {student.fullName}</p>
                  <p>
                    Total Correct: {student.totalCorrectQuestions}/
                    {student.totalQuestion}
                  </p>
                  <p>Marks Obtained: {student.marksObtained}</p>
                  <p>Date: {new Date(student.createdAt).toLocaleString()}</p>
                </li>
              ))
            ) : (
              <p>No students found for this quiz.</p>
            )}
          </ul>

          {/* Pagination Controls */}
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </button>
          <button onClick={handleNextPage}>Next</button>
        </div>
      )}
    </div>
  );
};

export default ExamDetailsPage;
