import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const initialValues = {
    fname: '',
    lname: '',
    username: '',
    email: '',
    phoneno: '',
    password: '',
    gender: '',
  };

  const validationSchema = Yup.object().shape({
    fname: Yup.string().required('Enter your first name'),
    lname: Yup.string().required('Enter your last name'),
    username: Yup.string().min(3).max(15).required('Set a unique username'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phoneno: Yup.string().matches(/^(0\d{10}|\d{11})$/, 'Invalid phone number').required('Phone number is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8)
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 'Password must contain at least one letter, one number, and one special character'),
  });

  const formSubmit = async (data) => {
    try {
      await axios.post(`http://localhost:3001/auth/register`, data);
      console.log('Registration successful!');
      navigate('/');
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        alert(error.response.data.error); // Display a pop-up alert with the error message
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-3xl font-bold mb-4 text-center text-green-400">Register</h2>

        <Formik initialValues={initialValues} onSubmit={formSubmit} validationSchema={validationSchema}>
          <Form>
            <div className="mb-2">
              <label htmlFor="fname" className="block text-sm font-medium text-gray-700">First Name</label>
              <Field type="text" id="fname" name="fname" className="mt-1 p-2 w-full border rounded-md" />
              <ErrorMessage name="fname" component="div" className="text-red-500 text-xs" />
            </div>
            <div className="mb-2">
              <label htmlFor="lname" className="block text-sm font-medium text-gray-700">Last Name</label>
              <Field type="text" id="lname" name="lname" className="mt-1 p-2 w-full border rounded-md" />
              <ErrorMessage name="lname" component="div" className="text-red-500 text-xs" />
            </div>
            <div className="mb-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
              <Field type="text" id="username" name="username" className="mt-1 p-2 w-full border rounded-md" />
              <ErrorMessage name="username" component="div" className="text-red-500 text-xs" />
            </div>
            <div className="mb-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <Field type="email" id="email" name="email" className="mt-1 p-2 w-full border rounded-md" />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs" />
            </div>
            <div className="mb-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <Field type="password" id="password" name="password" className="mt-1 p-2 w-full border rounded-md" />
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs" />
            </div>
            <div className="mb-2">
              <label htmlFor="phoneno" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <Field type="text" id="phoneno" name="phoneno" className="mt-1 p-2 w-full border rounded-md" />
              <ErrorMessage name="phoneno" component="div" className="text-red-500 text-xs" />
            </div>
            <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2 w-full font-semibold hover:bg-blue-600 focus:outline-none focus:bg-blue-600 transition duration-300">Register</button>
          </Form>
        </Formik>
        <p className="mt-4 text-sm text-gray-600">Already have an account? <Link to="/login" className="text-blue-500 hover:text-blue-600">Login here</Link></p>
      </div>
    </div>
  );
};

export default Register;
