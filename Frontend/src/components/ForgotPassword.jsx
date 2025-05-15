import React, { useState } from 'react';

function ForgotPassword() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.name && formData.email) {
      // You can perform your password reset logic here, for example, sending a request to a server.
      // Replace the following alert with your actual logic.
      window.alert('Password reset instructions sent to your email.');
    } else {
      window.alert('Please fill in all required fields.');
    }
  };

  return (
    <div>
      <br></br><br></br><br></br>
    <div className="container2">
      <center>
        <h2>Forgot Password</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <button type="submit">Reset Password</button>
          </div>
        </form>
        <p>{message}</p>
      </center>
    </div>
    </div>
  );
}

export default ForgotPassword;
