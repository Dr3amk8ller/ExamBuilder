import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create a context
const UserProfileContext = createContext();

// Create a provider component
export const UserProfileProvider = ({ children }) => {
  const [userProfileLink, setUserProfileLink] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
          const { UserProfileLink } = response.data;
          setUserProfileLink(UserProfileLink || '');
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

    fetchUserProfile(); // Fetch user profile data when the context provider mounts
  }, []); // Empty dependency array ensures this runs only on mount

  return (
    <UserProfileContext.Provider value={{ userProfileLink, setUserProfileLink, loading, error }}>
      {children}
    </UserProfileContext.Provider>
  );
};

// Custom hook for easy access to the context
export const useUserProfile = () => useContext(UserProfileContext);
