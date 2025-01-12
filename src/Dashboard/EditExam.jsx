import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import '../css/EditExamForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditExam = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { quiz } = location.state || {};
    
    // Initialize quizDetails state with a default boolean for isCompleted
    const [quizDetails, setQuizDetails] = useState({
        ...quiz,
        isCompleted: quiz?.isCompleted === "Completed" || quiz?.isCompleted === true || false
    });
    const [loading, setLoading] = useState(false);

    // Ensure isCompleted is always a boolean when the component mounts or quiz changes
    useEffect(() => {
        setQuizDetails((prevDetails) => ({
            ...prevDetails,
            isCompleted: prevDetails.isCompleted === "Completed" || prevDetails.isCompleted === true
        }));
    }, [quiz]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setQuizDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleToggleChange = (e) => {
        const { name, checked } = e.target;
        setQuizDetails((prevDetails) => ({
            ...prevDetails,
            [name]: checked,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found in local storage');
            setLoading(false);
            return;
        }
    
        // Convert status to boolean
        const statusBoolean = quizDetails.status === 'Active';
    
        const apiUrl = 'https://598sj81enf.execute-api.ap-south-1.amazonaws.com/v1/DashbordEdit_M';
        const payload = {
            _id: id,
            quizTitle: quizDetails.quizTitle,
            isCompleted: !!quizDetails.isCompleted,  // Ensure it's always a boolean
            status: statusBoolean,  // Add status as a boolean
    
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            }
        };
    
        console.log('API Request Payload:', payload);
    
        try {
            const response = await axios.post(apiUrl, payload, {
                headers: {
                    Authorization: token,
                    'Content-Type': 'application/json',
                },
            });
    
            console.log('API Response:', response);
    
            if (response.status === 200) {
                console.log('Quiz updated successfully');
                toast.success('Quiz updated successfully');
                navigate('/navigation/create-exam');
            } else {
                console.error('Failed to update quiz:', response.data);
                toast.error('Failed to update quiz');
            }
        } catch (error) {
            console.error('Error updating quiz:', error);
            toast.error('Error updating quiz');
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="edit-exam-form-container">
            {loading && <div className="loader-overlay"><div className="loader"></div></div>}
            <ToastContainer />
            <h2>Edit Exam</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="quizTitle">Quiz Title</label>
                    <input
                        type="text"
                        id="quizTitle"
                        name="quizTitle"
                        value={quizDetails.quizTitle || ''}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="isCompleted">Is Completed</label>
                    <label className="switch">
                        <input
                            type="checkbox"
                            id="isCompleted"
                            name="isCompleted"
                            checked={quizDetails.isCompleted || false}
                            onChange={handleToggleChange}
                        />
                        <span className="slider round"></span>
                    </label>
                </div>
                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        name="status"
                        value={quizDetails.status || 'Active'}
                        onChange={handleChange}
                        required
                        // disabled={quizDetails.isCompleted} 
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="createdAt">Created At</label>
                    <input
                        type="text"
                        id="createdAt"
                        name="createdAt"
                        value={format(new Date(quizDetails.createdAt), 'PPp')}
                        disabled
                    />
                </div>
                <button className="submitt-button" type="submit">Save Changes</button>
            </form>
        </div>
    );
};

export default EditExam;
