import React, { useState, useEffect } from 'react';
import './Login.css';
import md5 from 'md5';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import OTPForm from './OTPForm';
import { FaEye, FaEyeSlash, FaEnvelope } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useUserProfile } from './contexts/UserProfileContext';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


const Login = () => {

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { setUserProfileLink } = useUserProfile();
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  const handleShowPasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPassword(!showForgotPassword);
  };

  // const validateEmail = async (email) => {
  //   const VALIDATE_EMAIL_API_URL = 'https://ejy88n4hr6.execute-api.us-east-1.amazonaws.com/users/validate-email';
  //   try {
  //     const response = await axios.post(VALIDATE_EMAIL_API_URL, { email });
  //     setIsRegisteredEmail(response.data.isRegistered);
  //   } catch (error) {
  //     if (error.response) {
  //       console.error('Email validation failed:', error.response.data);
  //     } else if (error.request) {
  //       console.error('Email validation request made but no response received:', error.request);
  //     } else {
  //       console.error('Error setting up the email validation request:', error.message);
  //     }
  //   }
  // };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password || emailError || passwordError) {
      setEmailError(email ? "" : "Email is required");
      setPasswordError(password ? "" : "Password is required");
      return;
    }

    setIsLoading(true);

    try {
      const LOGIN_API_URL = 'https://598sj81enf.execute-api.ap-south-1.amazonaws.com/v1/userLoginN_M';
      const loginData = {
        email: email,
        password: md5(password),
      };
      console.log(loginData);

      const response = await axios.post(LOGIN_API_URL, loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Login response:', response);

      if (response.status === 200 && response.data && response.data.token) {
        const token = response.data.token;
        setUserProfileLink(response.UserProfileLink);
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
        navigate('/all-quizzes');
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const status = error.response.status;

        if (status === 401) {
          toast.error("Invalid Username or Password"); // Error toast
        } else if (status === 404) {
          setEmailError("Email not found. Please register first.");
          toast.error("Email not found. Please register first."); // Error toast
        } else if (status === 400) {
          setPasswordError("Bad Request. Please check your input.");
          toast.error("Bad Request. Please check your input."); // Error toast
        } else if (status === 500) {
          setPasswordError("Internal Server Error. Please try again later.");
          toast.error("Internal Server Error. Please try again later."); // Error toast
        } else {
          toast.error("An unexpected error occurred."); // Error toast
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        toast.error("No response from server. Please try again."); // Error toast
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', error.message);
        toast.error("An error occurred. Please try again."); // Error toast
      }
    } finally {
      setIsLoading(false);
    }
  }
  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    setEmailTouched(true);

    if (!EMAIL_REGEX.test(inputEmail)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };


  const handlePasswordChange = (e) => {
    const inputPassword = e.target.value;
    setPassword(inputPassword);

    // Regular expression for password validation
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Validate password against the regex
    if (!PASSWORD_REGEX.test(inputPassword)) {
      setPasswordError("Must be 8 characters, 1 uppercase, 1 lowercase, 1 number, and 1 special character: @$!%*?&");
    }
    
     else {
      setPasswordError("");
    }
  };

  // Use `onBlur` to mark the field as touched
  const handleBlur = () => {
    setPasswordTouched(true);
  };


  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
    if (e.target.checked) {
      localStorage.setItem('username', email);
      localStorage.setItem('password', md5(password));
    } else {
      localStorage.removeItem('username');
      localStorage.removeItem('password');
    }
  };

  const handleForgotPasswordSubmit = async (email) => {
    try {
      const FORGOT_PASSWORD_API_URL = 'https://598sj81enf.execute-api.ap-south-1.amazonaws.com/v1/forgetpasswordLN_M';
      const requestBody = { email, action: 'generate' } ;

      const response = await axios.post(FORGOT_PASSWORD_API_URL, requestBody, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Forgot Password response:', response.data);
    } catch (error) {
      console.error('Forgot Password failed:', error);
    }
  };

  return (
    <div>
      <Header />
      <ToastContainer/>
      <div className='wrapper-login'>
        {showForgotPassword ? (
          <ForgotPasswordForm
            handlePrevious={() => setShowForgotPassword(false)}
            handleForgotPasswordSubmit={handleForgotPasswordSubmit}
            userEmail={email}
          />
        ) : (
          <form onSubmit={handleLogin}>
            <h2 className="login-title">LogIn</h2>

            <div className="input-field">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                id="email"
                placeholder="User Id"
                value={email}
                onChange={handleEmailChange}
                onBlur={() => setEmailTouched(true)} // Mark email as touched on blur
                autoComplete="off"
              />
            </div>
            {emailTouched && emailError && <p className="error-login">{emailError}</p>}
            <div className="input-field">
              <RiLockPasswordLine className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handleBlur}
                autoComplete="off"
              />
              <span className="show-password-login" onClick={handleShowPasswordToggle}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {passwordTouched && passwordError && <p className="error-login">{passwordError}</p>}
            <div className="remember-forgot-login">
              <label>
                <input type="checkbox" checked={rememberMe} onChange={handleRememberMeChange} />
                Remember Me
              </label>
              <button type="button" onClick={handleForgotPasswordClick}>Forgot password?</button>
            </div>
            <br />
            <button type="submit" className="submit-login-button" disabled={isLoading}>
              {isLoading ? "Loading..." : "Login"}
            </button>
            <div className="forget-password-login">
              To create a new account <Link to="/register">click here</Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const ForgotPasswordForm = ({ handleForgotPasswordSubmit, userEmail, handlePrevious }) => {
  const [email, setEmail] = useState(userEmail);

  const [showOTPForm, setShowOTPForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await handleForgotPasswordSubmit(email);

      setShowOTPForm(true);
    } catch (error) {
      console.error('Failed to send reset email:', error);

    }

    setIsLoading(false);
  };



  return (
    <div className='forgot-password-form'>
             <a className='backtologinbutton' onClick={handlePrevious}>
            <i className="fas fa-arrow-left"></i>Login
          </a>
      {showOTPForm ? (
        <OTPForm userEmail={email} />
      ) : (
        <form onSubmit={handleSubmit}>

          <h2 className='login-title'>Forgot Password</h2>
          <div className='input-field'>
            <FaEnvelope className='input-icon' />
            <input
              type='email'
              id='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete='off'
            />
          </div>
          <p className='alert-message-login'></p>
          <br />
          <button type='submit' className='submit-login-button' disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Send Reset Link'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
