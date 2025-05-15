import React from 'react';
import image1 from './image1.jpg';
import image2 from './image2.jpg';

function Home() {
  return (
    <div>
      <br></br>
      <br></br>
      <div className="container2">
        <br />
        <br />
        {/* Two Images at the Top */}
        <div className="image-container">
          <img src={image1} alt="Image 1 Description" />
          <img src={image2} alt="Image 2 Description" />
        </div>

        <div className="container1">
          {/* Description of Your Website */}
          <h2>Welcome to Msc Academic Program</h2>
          <p>
            We are dedicated to providing an outstanding learning experience in
            the field of Computer Science. Our program is designed to equip you
            with the knowledge and skills needed to excel in this dynamic and
            ever-evolving field.
          </p>
          <p>
            Our team of experienced instructors is committed to your success.
            Whether you are a student looking to embark on a rewarding academic
            journey or an instructor striving to shape the future of computer
            science education, we are here to support you every step of the way.
          </p>
          <p>
            Explore our courses, assessments, and interactive learning
            resources. Join our vibrant community of learners and educators,
            and let's discover the limitless possibilities of computer science
            together.
          </p>
        </div>

        {/* Add more content as needed */}
      </div>

      
    </div>
  );
}

export default Home;
