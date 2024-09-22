// // // import React, { useState, useEffect } from "react";
// // // import SideBar from "./SideBar";
// // // import NavBar from "./NavBar";
// // // import "../css/Dashboard.css";
// // // import axios from "axios";

// // // const Dashboard = () => {
// // //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// // //   const [instituteData, setInstituteData] = useState([]); // API data
// // //   const [loading, setLoading] = useState(true); // Loading state
// // //   const [error, setError] = useState(null); // Error state

// // //   const toggleSidebar = () => {
// // //     setIsSidebarOpen(!isSidebarOpen);
// // //   };

// // //   // Fetch data from the StudentGraphDetails API
// // //   useEffect(() => {
// // //     const fetchData = async () => {
// // //       try {
// // //         setLoading(true);
// // //         const response = await axios.post(
// // //           "https://598sj81enf.execute-api.ap-south-1.amazonaws.com/v1/StudentGraphDetails",
// // //           {
// // //             email: "hupino.apubej@rungel.net",
// // //           },
// // //           {
// // //             headers: {
// // //               "Content-Type": "application/json",
// // //             },
// // //           }
// // //         );

// // //         // Check if the response has quizzes
// // //         if (response.data.message === "No quizzes found for this email") {
// // //           setError("No quizzes found.");
// // //         } else {
// // //           setInstituteData(response.data); // Use API response data
// // //         }
// // //       } catch (err) {
// // //         setError("Failed to load data");
// // //         console.error(err);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchData();
// // //   }, []);

// // //   const renderTableHeaders = () => {
// // //     return (
// // //       <tr>
// // //         <th>Quiz Title</th>
// // //         <th>Student Name</th>
// // //         <th>Correct Answers</th>
// // //         <th>Total Questions</th>
// // //       </tr>
// // //     );
// // //   };

// // //   const renderTableRows = () => {
// // //     return instituteData.map((item, index) => (
// // //       <tr key={item.studentid || index}>
// // //         <td>{item.quizTitle || "N/A"}</td> {/* Add quizTitle if available */}
// // //         <td>{item.fullName}</td>
// // //         <td>{item.totalCorrectQuestions}</td>
// // //         <td>{item.totalQuestion}</td>
// // //       </tr>
// // //     ));
// // //   };

// // //   // Loading state
// // //   if (loading) {
// // //     return <div>Loading...</div>;
// // //   }

// // //   // Error state
// // //   if (error) {
// // //     return <div>{error}</div>;
// // //   }

// // //   return (
// // //     <div className="dashboard-layout">
// // //       <NavBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
// // //       <div className="main-content">
// // //         <SideBar isOpen={isSidebarOpen} />
// // //         <div
// // //           className={`dashboard-container ${
// // //             isSidebarOpen ? "" : "sidebar-collapsed"
// // //           }`}
// // //         >
// // //           <h1 className="dashboard-title">Institute Table</h1>
// // //           <div className="table-wrapper">
// // //             <table className="dashboard-table">
// // //               <thead>{renderTableHeaders()}</thead>
// // //               <tbody>{renderTableRows()}</tbody>
// // //             </table>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Dashboard;



// // import React, { useState, useEffect } from "react";
// // import SideBar from "./SideBar";
// // import NavBar from "./NavBar";
// // import "../css/Dashboard.css";
// // import axios from "axios";

// // const Dashboard = () => {
// //   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
// //   const [instituteData, setInstituteData] = useState([]); // API data
// //   const [loading, setLoading] = useState(true); // Loading state
// //   const [error, setError] = useState(null); // Error state

// //   const toggleSidebar = () => {
// //     setIsSidebarOpen(!isSidebarOpen);
// //   };

// //   // Fetch data from the StudentGraphDetails API
// //   useEffect(() => {
// //     const fetchData = async () => {
// //       try {
// //         setLoading(true);
// //         const response = await axios.post(
// //           "https://598sj81enf.execute-api.ap-south-1.amazonaws.com/v1/StudentGraphDetails",
// //           {
// //             email: "hupino.apubej@rungel.net",
// //           },
// //           {
// //             headers: {
// //               "Content-Type": "application/json",
// //             },
// //           }
// //         );

// //         // Check if the response has quizzes
// //         if (response.data.message === "No quizzes found for this email") {
// //           setError("No quizzes found.");
// //         } else {
// //           setInstituteData(response.data); // Use API response data
// //         }
// //       } catch (err) {
// //         setError("Failed to load data");
// //         console.error(err);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchData();
// //   }, []);

// //   const renderTableHeaders = () => {
// //     return (
// //       <tr>
// //         <th>S.No</th>
// //         <th>Quiz Title</th>
// //         <th>Student Name</th>
// //         <th>Correct Answers</th>
// //         <th>Total Questions</th>
// //       </tr>
// //     );
// //   };

// //   const renderTableRows = () => {
// //     return instituteData.map((item, index) => (
// //       <tr key={item.studentid || index}>
// //         <td>{index + 1}</td> {/* Display serial number */}
// //         <td>{item.quizTitle || "N/A"}</td> {/* Add quizTitle if available */}
// //         <td>{item.fullName}</td>
// //         <td>{item.totalCorrectQuestions}</td>
// //         <td>{item.totalQuestion}</td>
// //       </tr>
// //     ));
// //   };

// //   // Loading state
// //   if (loading) {
// //     return <div>Loading...</div>;
// //   }

// //   // Error state
// //   if (error) {
// //     return <div>{error}</div>;
// //   }

// //   return (
// //     <div className="dashboard-layout">
// //       <NavBar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
// //       <div className="main-content">
// //         <SideBar isOpen={isSidebarOpen} />
// //         <div
// //           className={`dashboard-container ${
// //             isSidebarOpen ? "" : "sidebar-collapsed"
// //           }`}
// //         >
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




// import React, { useState, useEffect } from "react";
// import SideBar from "./SideBar";
// import NavBar from "./NavBar";
// import "../css/Dashboard.css";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faAngleLeft,
//   faAngleRight,
// } from "@fortawesome/free-solid-svg-icons";

// const Dashboard = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [instituteData, setInstituteData] = useState([]); // API data
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state
//   const [currentPage, setCurrentPage] = useState(1); // Pagination - current page
//   const [pageSize] = useState(10); // Pagination - page size
//   const [totalStudents, setTotalStudents] = useState(0); // Total number of students

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   // Fetch data from the StudentGraphDetails API with pagination
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.post(
//           `https://598sj81enf.execute-api.ap-south-1.amazonaws.com/v1/StudentGraphDetails?page=${currentPage}&pageSize=${pageSize}`,
//           {
//             email: "hupino.apubej@rungel.net", // Replace with dynamic email as needed
//           },
//           {
//             headers: {
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         // Handle no quizzes found
//         if (response.data.message === "No quizzes found for this email") {
//           setError("No quizzes found.");
//         } else {
//           setInstituteData(response.data.students || []); // Extract student data
//           setTotalStudents(response.data.totalStudents); // Total student count for pagination
//         }
//       } catch (err) {
//         if (err.response && err.response.data.message) {
//           setError(err.response.data.message);
//         } else {
//           setError("Failed to load data");
//         }
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [currentPage, pageSize]);

//   const renderTableHeaders = () => {
//     return (
//       <tr>
//         <th>S.No</th>
//         <th>Quiz Title</th>
//         <th>Student Name</th>
//         <th>Correct Answers</th>
//         <th>Total Questions</th>
//       </tr>
//     );
//   };

//   const renderTableRows = () => {
//     return instituteData.map((item, index) => (
//       <tr key={item.studentid || index}>
//         <td>{index + 1 + (currentPage - 1) * pageSize}</td>{" "}
//         {/* Pagination-aware serial number */}
//         <td>{item.quizTitle || "N/A"}</td>
//         <td>{item.fullName}</td>
//         <td>{item.totalCorrectQuestions}</td>
//         <td>{item.totalQuestion}</td>
//       </tr>
//     ));
//   };

//   const handlePageChange = (direction) => {
//     if (direction === "next" && currentPage * pageSize < totalStudents) {
//       setCurrentPage(currentPage + 1);
//     } else if (direction === "prev" && currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   // Loading state
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // Error state
//   if (error) {
//     return <div>{error}</div>;
//   }

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

//           {/* Pagination Controls */}
//           {/* <div className="pagination-container">
//             <button
//               onClick={() => handlePageChange("prev")}
//               disabled={currentPage === 1}
//             >
//               Previous
//             </button>
//             <span>Page {currentPage}</span>
//             <button
//               onClick={() => handlePageChange("next")}
//               disabled={currentPage * pageSize >= totalStudents}
//             >
//               Next
//             </button>
//           </div> */}
//           <div className="pagination-container">
//             <button
//               disabled={currentPage === 1}
//               onClick={() => handlePageChange(currentPage - 1)}
//             >
//               <FontAwesomeIcon icon={faAngleLeft} />
//             </button>
//             <span>
//               {totalPages > 0 ? `${currentPage} / ${totalPages}` : "1 / 1"}
//             </span>
//             <button
//               disabled={currentPage === totalPages || totalPages === 1}
//               onClick={() => handlePageChange(currentPage + 1)}
//             >
//               <FontAwesomeIcon icon={faAngleRight} />
//             </button>
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [instituteData, setInstituteData] = useState([]); // API data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [currentPage, setCurrentPage] = useState(1); // Pagination - current page
  const [pageSize] = useState(10); // Pagination - page size
  const [totalStudents, setTotalStudents] = useState(0); // Total number of students

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Fetch data from the StudentGraphDetails API with pagination
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          `https://598sj81enf.execute-api.ap-south-1.amazonaws.com/v1/StudentGraphDetails?page=${currentPage}&pageSize=${pageSize}`,
          {
            email: "hupino.apubej@rungel.net", // Replace with dynamic email as needed
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Handle no quizzes found
        if (response.data.message === "No quizzes found for this email") {
          setError("No quizzes found.");
        } else {
          setInstituteData(response.data.students || []); // Extract student data
          setTotalStudents(response.data.totalStudents); // Total student count for pagination
        }
      } catch (err) {
        if (err.response && err.response.data.message) {
          setError(err.response.data.message);
        } else {
          setError("Failed to load data");
        }
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, pageSize]);

  // Calculate total pages
  const totalPages = Math.ceil(totalStudents / pageSize);

  const renderTableHeaders = () => {
    return (
      <tr>
        <th>S.No</th>
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
        <td>{index + 1 + (currentPage - 1) * pageSize}</td>{" "}
        {/* Pagination-aware serial number */}
        <td>{item.quizTitle || "N/A"}</td>
        <td>{item.fullName}</td>
        <td>{item.totalCorrectQuestions}</td>
        <td>{item.totalQuestion}</td>
      </tr>
    ));
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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
          <div className="table-wrapper">
            <h1 className="dashboard-title">Institute Table</h1>
            <table className="dashboard-table">
              <thead>{renderTableHeaders()}</thead>
              <tbody>{renderTableRows()}</tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="pagination-container">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange("prev")}
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>
            <span>
              {totalPages > 0 ? `${currentPage} / ${totalPages}` : "1 / 1"}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange("next")}
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
