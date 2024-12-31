import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Success from '../components/Success';
import axios from 'axios';

function Registerscreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(''); // State to manage error messages
  const navigate = useNavigate();

  async function register() {
    if (password === cpassword) {
      setError(''); // Clear any previous error
      const user = { name, email, password };
      try {
        const response = await axios.post('http://localhost:5000/api/users/register', user);
        setSuccess(true);
        setName('');
        setEmail('');
        setPassword('');
        setCPassword('');
        console.log(response.data);
        setTimeout(() => navigate('/login'), 1000);
      } catch (error) {
        console.error(error.response?.data || error.message);
        alert('Registration failed');
      }
    } else {
      setError('Passwords do not match'); // Set the error message
    }
  }

  return (
    <div className="mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5 mt-5">
          {success && <Success message="Registration Successful" />}
          {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
          <div className="bs">
            <h2>Register</h2>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              value={cpassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
            <button className="btn btn-primary mt-3" onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
