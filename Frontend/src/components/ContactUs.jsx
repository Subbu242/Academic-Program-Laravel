import React from 'react';

function ContactUs() {
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // You can add your logic here to handle form submission, like sending data to a server

    // Display an alert to indicate the form submission
    alert('Form submitted successfully!');
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <div className="container2">
        <br />
        <br />
        <center>
          <h2>Contact Us</h2>
        </center>
        <center>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
            <br />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
            <br />
            <label htmlFor="message">Message:</label>
            <textarea id="message" name="message" rows="4" required></textarea>
            <br />
            <button type="submit">Send</button>
          </form>
        </center>
      </div>
    </div>
  );
}

export default ContactUs;
