// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../css/Profile.css';
// import Navbar from '../Dashboard/NavBar'; // Import the Navbar component

// const Profile = () => {
//   const [user, setUser] = useState({
//     name: '',
//     email: '',
//     instituteName: '',
//     createdAt: '',
//     profileImage: '',  // Add profileImage to state
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editing, setEditing] = useState(false);  // Add editing state
//   const [selectedImage, setSelectedImage] = useState(null);  // State for selected image

//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   const fetchUserProfile = async () => {
//     const token = localStorage.getItem('token');
//     const email = localStorage.getItem('email');

//     if (!token || !email) {
//       setError('Token or email not found in local storage');
//       setLoading(false);
//       return;
//     }

//     const apiUrl = 'https://7efwp1v3ed.execute-api.us-east-1.amazonaws.com/profile/P_details';

//     try {
//       const payload = {
//         headers: {
//           Authorization: token,
//         },
//         body: JSON.stringify({
//           email: email,
//         }),
//       };

//       console.log('Sending payload:', payload);

//       const response = await axios.post(apiUrl, payload, {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: token,
//         },
//       });

//       console.log('API Response:', response.data);

//       if (response.data && response.data.body) {
//         const { fullname, email: responseEmail, InstituteName, createdAt, profileImage } = response.data.body;

//         if (!fullname || !responseEmail || !InstituteName || !createdAt) {
//           setError('Incomplete user profile data received');
//           setLoading(false);
//           return;
//         }

//         setUser({
//           name: fullname,
//           email: responseEmail,
//           instituteName: InstituteName,
//           createdAt: new Date(createdAt).toLocaleString(),
//           profileImage: profileImage || '',  // Set the profileImage from API response
//         });
//       } else {
//         setError('Unexpected response structure');
//       }
//     } catch (error) {
//       if (error.response) {
//         setError(`Failed to fetch user profile: ${error.response.data.message || error.response.status}`);
//       } else if (error.request) {
//         setError('No response received from server');
//       } else {
//         setError(`Error: ${error.message}`);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditClick = () => {
//     document.getElementById('fileInput').click();
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = async () => {
//         setSelectedImage(reader.result);

//         const token = localStorage.getItem('token');
//         const apiUrl = 'https://your-api-endpoint/updateProfileImage';  // Replace with your actual API endpoint

//         try {
//           const response = await axios.post(apiUrl, {
//             profileImage: reader.result,
//           }, {
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: token,
//             },
//           });

//           if (response.status === 200) {
//             setUser((prevState) => ({
//               ...prevState,
//               profileImage: reader.result,
//             }));
//           }
//         } catch (error) {
//           setError('Failed to update profile image');
//         }
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   console.log('Loading State:', loading);
//   console.log('Error State:', error);
//   console.log('User State:', user);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   // Extract initials
//   const nameParts = user.name.split(' ');
//   const initials = nameParts.length > 1 ? nameParts[0][0] + nameParts[nameParts.length - 1][0] : nameParts[0][0];

//   return (
//     <div className="profile-container">
//       <Navbar userInitials={initials} />
//       <div className="profile-image-card">
//         <div className="profile-header-card">
//           <img 
//             src={selectedImage || user.profileImage} 
//             className="profile-image" 
//           />
//           <button className="editt-button" onClick={handleEditClick}>Edit</button>
//           <input 
//             id="fileInput" 
//             type="file" 
//             accept="image/*" 
//             style={{ display: 'none' }} 
//             onChange={handleImageChange} 
//           />
//         </div>
//       </div>
//       <div className="contact-details-card">
//         <div className="profile-card">
//           <h2 className="profile-card-title">Contact Person Details</h2>
//           <div className="profile-card-details">
//             <div className="profile-card-row">
//               <span className="profile-card-label">Fullname</span>
//               <span className="profile-card-value">{user.name}</span>
//             </div>
//             <div className="profile-card-row">
//               <span className="profile-card-label">Email ID</span>
//               <span className="profile-card-value">{user.email}</span>
//             </div>
//             <div className="profile-card-row">
//               <span className="profile-card-label">Institute Name</span>
//               <span className="profile-card-value">{user.instituteName}</span>
//             </div>
//             <div className="profile-card-row">
//               <span className="profile-card-label">Created At</span>
//               <span className="profile-card-value">{user.createdAt}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Profile.css';
import Navbar from '../Dashboard/NavBar'; // Import the Navbar component

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    instituteName: '',
    createdAt: '',
    UserProfileLink: '',  // Add profileImage to state
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);  // Add editing state
  const [selectedImage, setSelectedImage] = useState(null);  // State for selected image

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (!token || !email) {
      setError('Token or email not found in local storage');
      setLoading(false);
      return;
    }

    const apiUrl = 'https://7efwp1v3ed.execute-api.us-east-1.amazonaws.com/profile/P_details';

    try {
      const payload = {
        headers: {
          Authorization: token,
        },
        body: JSON.stringify({
          email: email,
        }),
      };

      console.log('Sending payload:', payload);

      const response = await axios.post(apiUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      console.log('First hit Response:', response.data);

      if (response.data && response.data.body) {
        const { fullname, email: responseEmail, InstituteName, createdAt, UserProfileLink } = response.data.body;

        if (!fullname || !responseEmail || !InstituteName || !createdAt) {
          setError('Incomplete user profile data received');
          setLoading(false);
          return;
        }

        setUser({
          name: fullname,
          email: responseEmail,
          instituteName: InstituteName,
          createdAt: new Date(createdAt).toLocaleString(),
          UserProfileLink: UserProfileLink || '',  // Set the profileImage from API response
        });
      } else {
        setError('Unexpected response structure');
      }
    } catch (error) {
      if (error.response) {
        setError(`Failed to fetch user profile: ${error.response.data.message || error.response.status}`);
      } else if (error.request) {
        setError('No response received from server');
      } else {
        setError(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };


  const handleEditClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result.split(',')[1];  // Get Base64 string
        setSelectedImage(reader.result);

        const token = localStorage.getItem('token');
        const uploadApiUrl = 'https://7efwp1v3ed.execute-api.us-east-1.amazonaws.com/upload/imageS3Bucket';

        try {
          const payload = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
            body: JSON.stringify({
              imageType: 'profile',
              image: base64Image,
            }),
          };
          const response = await axios.post(uploadApiUrl, payload, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: token,
            },
          });

          const imageUrl = response.data.body.imageUrl;

          if (response.status === 200) {
            // Update profile with new image URL
            const profileApiUrl = 'https://7efwp1v3ed.execute-api.us-east-1.amazonaws.com/profile/P_details';
            const email = localStorage.getItem('email');

            const secondpayload = {
              headers: {
                'Content-Type': 'application/json',
                Authorization: token, // Ensure token is defined and valid
              },
              body: JSON.stringify({
                email: email,
                UserProfileLink: imageUrl,
              }),
            };
            console.log("payload second hit",secondpayload);
            const response = await axios.post(profileApiUrl, secondpayload, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: token,
              },
            });
            console.log("second hit",response);

            // const updateResponse = await axios.post(profileApiUrl, JSON.stringify({
            //   email: email,
            //   UserProfileLink: imageUrl,
            // }), {
            //   headers: {
            //     'Content-Type': 'application/json',
            //     Authorization: token, // Ensure token is defined and valid
            //   },
            // });

            if (response.status === 200) {
              setUser((prevState) => ({
                ...prevState,
                UserProfileLink: imageUrl,
              }));
            }
          }
        }
        catch (error) {
          console.error('Error: ', error);
        }

      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Extract initials
  const nameParts = user.name.split(' ');
  const initials = nameParts.length > 1 ? nameParts[0][0] + nameParts[nameParts.length - 1][0] : nameParts[0][0];

  return (
    <div className="profile-container">
      <Navbar userInitials={initials} />
      <div className="profile-image-card">
        <div className="profile-header-card">
          <img
            src={selectedImage || user.UserProfileLink}
            className="profile-image"
            alt="Profile"
          />
          <button className="editt-button" onClick={handleEditClick}>Edit</button>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </div>
      </div>
      <div className="contact-details-card">
        <div className="profile-card">
          <h2 className="profile-card-title">Contact Person Details</h2>
          <div className="profile-card-details">
            <div className="profile-card-row">
              <span className="profile-card-label">Fullname</span>
              <span className="profile-card-value">{user.name}</span>
            </div>
            <div className="profile-card-row">
              <span className="profile-card-label">Email ID</span>
              <span className="profile-card-value">{user.email}</span>
            </div>
            <div className="profile-card-row">
              <span className="profile-card-label">Institute Name</span>
              <span className="profile-card-value">{user.instituteName}</span>
            </div>
            <div className="profile-card-row">
              <span className="profile-card-label">Created At</span>
              <span className="profile-card-value">{user.createdAt}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
