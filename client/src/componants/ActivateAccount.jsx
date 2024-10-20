import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ActivateAccount = () => {
    const { activation_token } = useParams();  // Get token from URL
    const [error, setError] = useState(false);

    useEffect(() => {
        if (activation_token) {
            const activateAccount = async () => {
                try {
                    // Send token in the URL as a GET request
                    const res = await axios.get(`http://localhost:8000/api/activation/${activation_token}`);
                    console.log(res.data.message);
                } catch (error) {
                    console.log(error.message);
                    setError(true);
                }
            };

            activateAccount();
        }
    }, [activation_token]);

    return (
        <div className="w-[100%] h-[100vh] flex justify-center items-center">
            {error ? (
                <p>There was an error activating your account.</p>
            ) : (
                <p>Your account has been activated!</p>
            )}
        </div>
    );
};

export default ActivateAccount;
