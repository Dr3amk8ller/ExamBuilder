import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AvatarEditor from 'react-avatar-editor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import '../css/Profile.css';
import { useUserProfile } from '../contexts/UserProfileContext';

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
  const { setUserProfileLink } = useUserProfile();

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

    const apiUrl = 'https://598sj81enf.execute-api.ap-south-1.amazonaws.com/v1/userProfile_M';

    try {
      const payload = {
        headers: {
          Authorization: token,
        },
          email: email,
      };

      const response = await axios.post(apiUrl, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });

      if (response.data && response.data) {
        const { fullname, email: responseEmail, InstituteName, createdAt, UserProfileLink } = (response.data);
        setUser({
          name: fullname,
          email: responseEmail,
          instituteName: InstituteName,
          createdAt: new Date(createdAt).toLocaleString(),
          profileImage: UserProfileLink || '',
        });
        setUserProfileLink(UserProfileLink);
        window.dispatchEvent(new Event('profileImageUpdated'));
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
      const canvas = editor.getImageScaledToCanvas().toDataURL('image/jpeg');
      const base64String = canvas.split(',')[1]; 

      setUploading(true); 

      try {
        const token = localStorage.getItem('token');
        const apiUrl = 'https://598sj81enf.execute-api.ap-south-1.amazonaws.com/v1/userProfileImage_S3_M';

        await axios.post(apiUrl, {
          image: base64String,
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        });

        // Update the profile image in the local state and the context
        setUser({ ...user, profileImage: canvas });
        setUserProfileLink(canvas); // Update context, which triggers a rerender in Navbar
        setEditing(false);
      } catch (error) {
        setError(`Error: ${error.message}`);
      } finally {
        setUploading(false); 
      }
    }
  };

  if (loading) {
    return (
      <div className="loader-overlay">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) return <div>{error}</div>;

  const nameParts = user.name.split(' ');
  const initials = nameParts.length > 1 ? nameParts[0][0] + nameParts[nameParts.length - 1][0] : nameParts[0][0];

  return (
    <div className="profile-container">
      <div>
        {/* <Navbar userInitials={initials} resEmail={user.email} /> */}
      </div>
      <div className="profile-image-card">
        <div className="profile-header-card">
          {uploading && <div className="loader-overlay"><div className="loader"></div></div>}
          {editing ? (
            <>
              <AvatarEditor
                ref={setEditor}
                image={selectedImage}
                width={250}
                height={250}
                border={50}
                borderRadius={125}
                color={[47, 66, 67]} 
                scale={1.2}
                rotate={0}
              />
              <button className="edit-button" onClick={handleSaveClick}>Upload</button>
            </>
          ) : (
            <>
              {user.profileImage ? (
                <img
                  src={user.profileImage}
                  className="profile-image"
                  alt="Profile"
                />
              ) : (
                <FontAwesomeIcon className="profile-image"
                  icon={faUserCircle}
                  size="10x"
                  style={{ color: '#cccccc' }} // White or grey skeleton image
                />
              )}
              <button className="editt-button" onClick={handleEditClick}></button>
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
