import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

import './App.css';

const Login = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [isLogin, setIsLogin] = useState(true); 
  const [message, setMessage] = useState(''); 
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Form Submitted");

    let formValid = true;
    const newErrors = {
      email: '',
      password: '',
      confirmPassword: ''
    };

    if (!validateEmail(formData.email)) {
      formValid = false;
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!validatePassword(formData.password)) {
      formValid = false;
      newErrors.password = 'Password must be between 8-20 characters, and include at least one uppercase letter, one lowercase letter, and one number.';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      formValid = false;
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    console.log("Errors:", newErrors);

    if (formValid) {
      // Log the data only after form submission is successful
      console.log("Form Data Submitted:", formData); // Log final data before submission

      if (isLogin) {
        setMessage('Login Successful! Redirecting...');
        setTimeout(() => {
          console.log("Redirecting to Home");
          navigate('/home');
        }, 2000);
      } else {
        setMessage('Sign Up Successful! You can now login.');
        setTimeout(() => {
          setIsLogin(true); // Switch to login form after successful sign up
        }, 2000);
      }
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mt-5">{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit} className="form-group">
        {!isLogin && (
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <small className="text-danger">{errors.password}</small>}
        </div>
        {!isLogin && (
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="form-control"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
          </div>
        )}
        <button type="submit" className="btn btn-primary w-100">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <div className="text-center mt-3">
        {message && <p className="text-success">{message}</p>}
        <button
          className="btn btn-link"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default Login;
