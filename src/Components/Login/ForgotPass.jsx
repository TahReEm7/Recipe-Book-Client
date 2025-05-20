import React, { use } from 'react';

import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../../Context/AuthContext';

const ForgotPass = () => {
    const {ResetPass,
        email,
        setEmail,
        message, } = use(AuthContext);
        const navigate = useNavigate();
        const handleReset = async () => {
            await ResetPass(email);
            setTimeout(() => {
              navigate("/login");
            }, 2000); 
          };

    return (
        <div className="max-w-3xl mx-auto my-10 p-6 bg-base-200 shadow-xl rounded-xl">
           <Helmet>
        <title>Forgot Password || Recipe Book</title>
      </Helmet>
             <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Reset Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        className="border p-2 mb-2 w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleReset}
        className="bg-red-400 text-white px-4 py-2 rounded"
      >
        Send Reset Link
      </button>
      {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
    </div>
        </div>
    );
};

export default ForgotPass;