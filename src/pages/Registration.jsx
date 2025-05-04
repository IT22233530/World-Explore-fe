import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Phone, IdCard, AlertCircle, Loader2, LogIn } from 'lucide-react';

const Registration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    // nic: '',
    // phoneNumber: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateInputs = () => {
    // const nicRegex = /^(\d{9}[Zz]|\d{12})$/;
    // const phoneRegex = /^(\+94|0)?[1-9]\d{8}$/;
  
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
  
    // Check if password length is at least 8 characters
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
  
    // // Check NIC format
    // if (!nicRegex.test(formData.nic)) {
    //   setError("Invalid NIC format. Use 9 digits followed by 'V' or 'X', or a 12-digit format.");
    //   return false;
    // }
  
    // // Check phone number format
    // if (!phoneRegex.test(formData.phoneNumber)) {
    //   setError("Invalid phone number format.");
    //   return false;
    // }
  
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!validateInputs()) return;

    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      if (response.status === 201) {
        setSuccessMessage('Registration successful! Redirecting to login page...');
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="text-3xl font-bold text-gray-900">Create an Account</h2>
          <p className="mt-2 text-gray-600">Please fill in your details to register</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 space-y-6">
          {/* Error Alert */}
          {error && (
            <div className="flex items-center gap-2 p-4 rounded-lg bg-red-50 text-red-600" role="alert">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="flex items-center gap-2 p-4 rounded-lg bg-green-50 text-green-600" role="alert">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <p className="text-sm font-medium">{successMessage}</p>
            </div>
          )}

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-2">
            {[ 
              { id: 'name', placeholder: 'Name', icon: <User size={20} className=' text-gray-400'/> },
              { id: 'email', placeholder: 'Email', icon: <Mail size={20} className=' text-gray-400' /> },
            //   { id: 'nic', placeholder: 'NIC', icon: <IdCard size={20} className=' text-gray-400' /> },
            //   { id: 'phoneNumber', placeholder: 'Phone Number', icon: <Phone size={20} className=' text-gray-400'/> },
              { id: 'password', placeholder: 'Password', type: 'password', icon: <Lock size={20} className=' text-gray-400'/> },
              { id: 'confirmPassword', placeholder: 'Confirm Password', type: 'password', icon: <Lock size={20} className=' text-gray-400'/> }
            ].map(({ id, placeholder, icon, type = 'text' }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                  {placeholder}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {icon}
                  </div>
                  <input
                    id={id}
                    name={id}
                    type={type}
                    required
                    className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder={placeholder}
                    value={formData[id]}
                    onChange={(e) => setFormData({ ...formData, [id]: e.target.value })}
                  />
                </div>
              </div>
            ))}

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  <span>Register</span>
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition-colors"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
