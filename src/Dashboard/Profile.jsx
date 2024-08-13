//added loader

import React, { useState, useEffect ,} from 'react';
import axios from 'axios';
import AvatarEditor from 'react-avatar-editor';
import '../css/Profile.css';
import Navbar from '../Dashboard/NavBar';


const Profile = () => {
 
  const [user, setUser] = useState({
    name: '',
    email: '',
    instituteName: '',
    createdAt: '',
    profileImage: '',
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editor, setEditor] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [testimage,settestImage]=useState(false);
 

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

      const response = await axios.post(apiUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      if (response.data && response.data.body) {
        const { fullname, email: responseEmail, InstituteName, createdAt, UserProfileLink } = JSON.parse(response.data.body);
        setUser({
          name: fullname,
          email: responseEmail,
          instituteName: InstituteName,
          createdAt: new Date(createdAt).toLocaleString(),
          profileImage: UserProfileLink || '',
        });
        // setUserProfileLink(UserProfileLink);
        // console.log(testimage);
        // if(testimage){
        //   localStorage.setItem('pimage',UserProfileLink);
        // }
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setEditing(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveClick = async () => {
    if (editor) {
      // localStorage.setItem('pimage',image/jpeg);
      const canvas = editor.getImageScaledToCanvas().toDataURL('image/jpeg');
      console.log("what is this",canvas);
      const base64String = canvas.split(',')[1]; // Extract the base64 string without the data URL prefix

      setUploading(true); // Show the loader

      try {
        const token = localStorage.getItem('token');
        const apiUrl = 'https://j0mmgihtaj.execute-api.us-east-1.amazonaws.com/v1/userProfileImage_S3';

        await axios.post(apiUrl, {
          image: base64String,
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });

        setUser({ ...user, profileImage: canvas });
        localStorage.setItem('pimage', canvas);
        // setUserProfileLink(canvas);
        setEditing(false);
        // settestImage(true);
        
        console.log('Image uploaded successfully');
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setUploading(false); // Hide the loader after upload completes
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const nameParts = user.name.split(' ');
  const initials = nameParts.length > 1 ? nameParts[0][0] + nameParts[nameParts.length - 1][0] : nameParts[0][0];

  return (
    <div className="profile-container">
      <Navbar userInitials={initials} resEmail={user.email} />
      {/* <h4>{user.email}</h4> */}
      <div className="profile-image-card">
        <div className="profile-header-card">
          {uploading && <div className="loader-overlay"><div className="loader"></div></div>} {/* Show loader overlay if uploading */}
          {editing ? (
            <>
              <AvatarEditor
                ref={setEditor}
                image={selectedImage}
                width={250}
                height={250}
                border={50}
                borderRadius={125}
                color={[47, 66, 67]} // RGBA
                scale={1.2}
                rotate={0}
              />
              <button className="editt-button" onClick={handleSaveClick}>Upload</button>
            </>
          ) : (
            <>
              <img
                src={user.profileImage}
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
            </>
          )}
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