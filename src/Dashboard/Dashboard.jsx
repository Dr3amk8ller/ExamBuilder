// // import React from "react";
// // import NavBar from "./NavBar";
// // import "../css/Dashboard.css"; // Make sure to create and link this CSS file
// // import SideBar from "./SideBar";

// // const Dashboard = () => {
// //   const instituteData = [
// //     {
// //       quizTitle: "Science Quiz",
// //       studentName: "James Smith",
// //       appNumber: "54321",
// //       marksObtained: 70,
// //       totalMarks: 100,
// //       correctAnswers: 7,
// //       totalQuestions: 10,
// //     },
// //     {
// //       quizTitle: "English Quiz",
// //       studentName: "Emily Johnson",
// //       appNumber: "98765",
// //       marksObtained: 90,
// //       totalMarks: 100,
// //       correctAnswers: 9,
// //       totalQuestions: 10,
// //     },
// //   ];

// //   // Function to render table headers for the "Institute" role
// //   const renderTableHeaders = () => {
// //     return (
// //       <tr>
// //         <th>Quiz Title</th>
// //         <th>Student Name</th>
// //         <th>Application Number</th>
// //         <th>Marks Obtained</th>
// //         <th>Total Marks</th>
// //         <th>Correct Answers</th>
// //         <th>Total Questions</th>
// //       </tr>
// //     );
// //   };

// //   // Function to render table rows based on the "Institute" data
// //   const renderTableRows = () => {
// //     return instituteData.map((item, index) => (
// //       <tr key={index}>
// //         <td>{item.quizTitle}</td>
// //         <td>{item.studentName}</td>
// //         <td>{item.appNumber}</td>
// //         <td>{item.marksObtained}</td>
// //         <td>{item.totalMarks}</td>
// //         <td>{item.correctAnswers}</td>
// //         <td>{item.totalQuestions}</td>
// //       </tr>
// //     ));
// //   };

// //   return (
// //     <div className="dashboard-layout">
// //       <NavBar />
// //       <div className="main-content">
// //         <SideBar />
// //         <div className="dashboard-container">
// //           <h1 className="dashboard-title">Institute Table</h1>
// //           <div className="table-wrapper">
// //             <table className="dashboard-table">
// //               <thead>{renderTableHeaders()}</thead>
// //               <tbody>{renderTableRows()}</tbody>
// //             </table>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Dashboard;


// import React, { useState } from "react";
// import SideBar from "./SideBar";
// import NavBar from "./NavBar";
// import "../css/Dashboard.css";

// const Dashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const instituteData = [
//     {
//       quizTitle: "Science Quiz",
//       studentName: "James Smith",
//       // appNumber: "54321",
//       marksObtained: 70,
//       totalMarks: 100,
//       correctAnswers: 7,
//       totalQuestions: 10,
//     },
//     {
//       quizTitle: "English Quiz",
//       studentName: "Emily Johnson",
//       // appNumber: "98765",
//       marksObtained: 90,
//       totalMarks: 100,
//       correctAnswers: 9,
//       totalQuestions: 10,
//     },
//   ];

//   const renderTableHeaders = () => {
//     return (
//       <tr>
//         <th>Quiz Title</th>
//         <th>Student Name</th>
//         {/* <th>Application Number</th> */}
//         <th>Marks Obtained</th>
//         <th>Total Marks</th>
//         <th>Correct Answers</th>
//         <th>Total Questions</th>
//       </tr>
//     );
//   };

//   const renderTableRows = () => {
//     return instituteData.map((item, index) => (
//       <tr key={index}>
//         <td>{item.quizTitle}</td>
//         <td>{item.studentName}</td>
//         {/* <td>{item.appNumber}</td> */}
//         <td>{item.marksObtained}</td>
//         <td>{item.totalMarks}</td>
//         <td>{item.correctAnswers}</td>
//         <td>{item.totalQuestions}</td>
//       </tr>
//     ));
//   };

//   return (
//     <div className="dashboard-layout">
//       <NavBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
//       <div className="main-content">
//         <SideBar isOpen={isSidebarOpen} />
//         <div
//           className={`dashboard-container ${
//             isSidebarOpen ? "" : "sidebar-collapsed"
//           }`}
//         >
//           <h1 className="dashboard-title">Institute Table</h1>
//           <div className="table-wrapper">
//             <table className="dashboard-table">
//               <thead>{renderTableHeaders()}</thead>
//               <tbody>{renderTableRows()}</tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;






import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import "../css/Dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [instituteData, setInstituteData] = useState([]); // API data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch data from the StudentGraphDetails API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "https://598sj81enf.execute-api.ap-south-1.amazonaws.com/v1/StudentGraphDetails",
          {
            email: "hupino.apubej@rungel.net",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Check if the response has quizzes
        if (response.data.message === "No quizzes found for this email") {
          setError("No quizzes found.");
        } else {
          setInstituteData(response.data); // Use API response data
        }
      } catch (err) {
        setError("Failed to load data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderTableHeaders = () => {
    return (
      <tr>
        <th>Quiz Title</th>
        <th>Student Name</th>
        <th>Correct Answers</th>
        <th>Total Questions</th>
      </tr>
    );
  };

  const renderTableRows = () => {
    return instituteData.map((item, index) => (
      <tr key={item.studentid || index}>
        <td>{item.quizTitle || "N/A"}</td> {/* Add quizTitle if available */}
        <td>{item.fullName}</td>
        <td>{item.totalCorrectQuestions}</td>
        <td>{item.totalQuestion}</td>
      </tr>
    ));
  };

  // Loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="dashboard-layout">
      <NavBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <div className="main-content">
        <SideBar isOpen={isSidebarOpen} />
        <div
          className={`dashboard-container ${
            isSidebarOpen ? "" : "sidebar-collapsed"
          }`}
        >
          <h1 className="dashboard-title">Institute Table</h1>
          <div className="table-wrapper">
            <table className="dashboard-table">
              <thead>{renderTableHeaders()}</thead>
              <tbody>{renderTableRows()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
