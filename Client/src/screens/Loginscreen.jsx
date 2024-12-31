import React, { useState } from 'react';
import axios from 'axios';
import Error from '../components/Error';

function Loginscreen() {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [error, setError] = useState(null); // Added error state

  async function Login() {
    const user = {
      email,
      password,
    };

    try {
      const result = await axios.post('http://localhost:5000/api/users/login', user);
      console.log(result.data); // Corrected log statement
      localStorage.setItem('currentUser', JSON.stringify(result.data)); // Store only the response data
      window.location.href = '/home';
    } catch (err) {
      console.error(err.response?.data || err.message); // Log detailed error
      setError(true); // Set error message
     
    }
  }

  return (
    <div className="mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5 mt-5">
          {error && <Error message='Invalid Credentials'/>} {/* Render error */}
          <div className="bs">
            <h2>Login</h2>
            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
            <button className="btn btn-primary mt-3" onClick={Login}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
